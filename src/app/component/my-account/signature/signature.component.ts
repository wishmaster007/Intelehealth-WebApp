import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EncounterService } from 'src/app/services/encounter.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements OnInit {
  baseURL = environment.baseURL;

  addSignatureForm = new FormGroup({
    signature: new FormControl(''),
    text: new FormControl('')
  });
  status = false;
  name = 'Enter text';

  constructor(private service: EncounterService,
              private http: HttpClient,
              private snackbar: MatSnackBar,
              private dialogRef: MatDialogRef<SignatureComponent>) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }


onSubmit() {
  const formValue = this.addSignatureForm.value;
  const signatureValue = formValue.signature;
  const signText = formValue.text;
  if (signatureValue === '1') {
    this.signature(signText, 'arty');
  }
  if (signatureValue === '2') {
    this.signature(signText, 'asem');
  }
  if (signatureValue === '3') {
    this.signature(signText, 'youthness');
  }
}


signature = (text: string, font: string) => {
this.service.session()
  .subscribe(response => {
    const userUuid = response.user.uuid;
    this.service.provider(userUuid)
    .subscribe(provider => {
      const providerUuid = provider.results[0].uuid;
      this.service.signRequest(providerUuid)
          .subscribe(res => {
            const data = res.results;
            if (data.length !== 0 ) {
              data.forEach(value => {
                if (value.display.match('textOfSign') !== null) {
                  this.status = true;
                }
              });
            }
            if (!this.status) {
              const url2 = `${this.baseURL}/provider/${providerUuid}/attribute`;
              const json = {
                'attributeType': 'c1c6458d-383b-4034-afa0-16a34185b458',
                'value': text
              };
              this.http.post(url2, json)
              .subscribe(pp => {
              });
              const url3 = `${this.baseURL}/provider/${providerUuid}/attribute`;
              const json1 = {
                'attributeType': '8d321915-e59d-4e19-98a9-086946bfc72b',
                'value': font
              };
              this.http.post(url3, json1)
              .subscribe(ps => {
                this.snackbar.open('Signature added successfully', null, { duration: 4000 });
              });
            }
    });
  });
});
}
}

