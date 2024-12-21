import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/modules/shared/service/toast/toast.service';
import { DateService } from 'src/app/modules/shared/utils/date/date.service';
import { IUserResponseItem } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss'],
})
export class UsersAddComponent implements OnInit {
  @Input() data: any;
  @Output() onReload: EventEmitter<void> = new EventEmitter<void>();
  userForm: FormGroup;
  roles = [
    { id: 1, name: 'ادمین' },
    { id: 2, name: 'کاربر' },
  ];
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
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [this.isEditMode? Validators.required:Validators.nullValidator]],
      roleId: ['', [Validators.required]],
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
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      roleId: user.roleId,
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
