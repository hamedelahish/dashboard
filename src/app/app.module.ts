import {NgModule, APP_INITIALIZER} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {ClipboardModule} from 'ngx-clipboard';
import {TranslateModule} from '@ngx-translate/core';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from './modules/auth';
import {environment} from 'src/environments/environment';
import {FakeAPIService} from './_fake';
import {Store, StoreModule} from '@ngrx/store';
import {productReducer} from "./store/product/product.reducer";
import {categoryReducer} from "./store/category/category.reducer";
import {initialCategories, initialProducts} from "./initialData";
import {addProduct} from "./store/product/product.actions";
import {addCategory} from "./store/category/category.actions";
import {AppState} from "./store";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {en_US} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import { OverlayModule} from "@angular/cdk/overlay";



registerLocaleData(en);

// #fake-end#

function appInitializer(authService: AuthService, store: Store<AppState>) {

  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);

      initialProducts.forEach(product => store.dispatch(addProduct({product})));
      initialCategories.forEach(category => store.dispatch(addCategory({category})));
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    OverlayModule,
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
        passThruUnknownUrl: true,
        dataEncapsulation: false,
      })
      : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    StoreModule.forRoot({product: productReducer, category: categoryReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    FormsModule,

  ],
  providers: [

    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService, Store],
    },
    {provide: NZ_I18N, useValue: en_US},
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
