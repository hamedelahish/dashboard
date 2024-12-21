import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/modules/shared/service/toast/toast.service';
import { DateService } from 'src/app/modules/shared/utils/date/date.service';
import { IUserResponseItem } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-users-edit-password',
  templateUrl: './users-edit-password.component.html',
  styleUrls: ['./users-edit-password.component.scss'],
})
export class UsersEditPasswordComponent implements OnInit {
  @Input() data: any;
  @Output() onReload: EventEmitter<void> = new EventEmitter<void>();
  userForm: FormGroup;

  isEditMode: boolean = false;
  constructor(
    public activeModal: NgbActiveModal,
    private usersService: UsersService,
    private dateService: DateService,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
   
    });
  }

  ngOnInit() {
    if (this.data && this.data.user) {
      this.isEditMode = true;
      this.loadUser(this.data.user);
    }
  }

  loadUser(user: IUserResponseItem) {
    this.userForm.patchValue({
      username: user.username
 
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;


      if (this.isEditMode) {
        formData.userId = this.data.user.userId;
         delete formData.password;
         

        this.usersService.updateUserAndCustomer(formData).subscribe({
          next: (response) => {
            console.log('User:', response);
            this.onReload.emit();
            this.activeModal.close('Save click');
            this.toastService.showToast(
              'کاربر با موفقیت ویرایش شد',
              'ویرایش کاربر',
              'success'
            );
          },
          error: (err) => {
            console.error('user error:', err);
            this.toastService.showToast(
              'خطا در ویرایش کاربر',
              'ویرایش کاربر',
              'error'
            );
          },
        });
      } else {
        this.usersService.insertUserAndCustomer(formData).subscribe({
          next: (response) => {
            console.log('User:', response);
            this.onReload.emit();
            this.activeModal.close('Save click');
            this.toastService.showToast(
              'کاربر با موفقیت ایجاد شد',
              'افزودن کاربر',
              'success'
            );
          },
          error: (err) => {
            console.error('user error:', err);
            this.toastService.showToast(
              'خطا در ایجاد کاربر جدید',
              'افزودن کاربر',
              'error'
            );
          },
        });
      }
    }
  }

  convertToPersianDate(date: string): string {
    return this.dateService.ConvertToPersianDate(date);
  }
}
