import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiagnosisService } from 'src/app/services/diagnosis.service';
import { GuidelinesService} from 'src/app/services/guidelines.service';

@Component({
  selector: 'app-presenting-complaints',
  templateUrl: './presenting-complaints.component.html',
  styleUrls: ['./presenting-complaints.component.css'],
})
export class PresentingComplaintsComponent implements OnInit {

  complaint: any = [];
  complaintPresent = false;
  conceptComplaint = '3edb0e09-9135-481e-b8f0-07a26fa9a5ce';
  guidelines: any = [];
  complaints: Array<string> = [];

  constructor(private diagnosisService: DiagnosisService,
              private route: ActivatedRoute,
              private guidelinesService: GuidelinesService) { }

  ngOnInit() {
    const patientUuid = this.route.snapshot.paramMap.get('patient_id');
    const visitUuid = this.route.snapshot.paramMap.get('visit_id');
    this.diagnosisService.getObs(patientUuid, this.conceptComplaint)
    .subscribe(response => {
      response.results.forEach(obs => {
        if (obs.encounter.visit.uuid === visitUuid) {
          this.complaint.push(obs);

          const startDelimiterASCII: number = obs.value.charCodeAt(0);
          const stopDelimiterASCII: number = ':'.charCodeAt(0);
          const startDeilimiter: Array<number> = [];
          const stopDelimiter: Array<number> = [];
          for(let i=0; i<obs.value.length; i++) {
            if(obs.value.charCodeAt(i) == startDelimiterASCII) startDeilimiter.push(i);
            else if(obs.value.charCodeAt(i) == stopDelimiterASCII) stopDelimiter.push(i);
          }

          for(let i=0; i<startDeilimiter.length; i++) this.complaints.push(obs.value.substring(startDeilimiter[i]+4, stopDelimiter[i]-4));
          }
          
          this.complaints.forEach((complaint) => {
            this.guidelinesService.getGuidelines(complaint).subscribe((documents) => {
              documents.forEach((document) => {
                this.guidelines.push(document);
              })
            })
          })
      });
      if (this.complaint !== undefined) {
        this.complaintPresent = true;
      }
    });
 }
}

