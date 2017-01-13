import { BrowserModule }                                    from '@angular/platform-browser';
import { NgModule }                                         from '@angular/core';
import { FormsModule }                                      from '@angular/forms';
import { HttpModule }                                       from '@angular/http';

import { AppComponent }                                     from './app.component';
import { AppRoutingModule, SCENES }                         from './app-routing.module';
import { MOLECULES }                                        from './components/molecules';

// import { MdButton, MdAnchor }                               from '@angular2-material/button';
import { MdIcon, MdIconRegistry }                           from '@angular2-material/icon';
// import { MdToolbar, MdToolbarRow }                          from '@angular2-material/toolbar';
// import { MdInput, MdHint }                                  from '@angular2-material/input';
// import { MdCard }                                           from '@angular2-material/card';
// import { MdList, MdListAvatar, MdListDivider, MdListItem }  from '@angular2-material/list';
// import { MdSlideToggle }                                    from '@angular2-material/slide-toggle';
// import { MdCheckbox }                                       from '@angular2-material/checkbox';

const MATERIAL = [
  // MdButton, MdAnchor,
  MdIcon,
  // MdToolbar, MdToolbarRow,
  // MdInput, MdHint,
  // MdCard,
  // MdList, MdListAvatar, MdListDivider, MdListItem,
  // MdSlideToggle,
  // MdCheckbox
];

@NgModule({
  declarations: [
    AppComponent,
    ...MATERIAL,
    ...MOLECULES,
    ...SCENES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    MdIconRegistry
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
