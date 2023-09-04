import {Component, OnInit} from '@angular/core';
import {PaymentDetailService} from "../shared/payment-detail.service";
import {PaymentDetail} from "../shared/payment-detail.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.service.refreshList()
  }
  constructor(public service: PaymentDetailService, private toastr: ToastrService) {

  }
  populateForm(selectedRecord: PaymentDetail) {
	  this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
	  if (confirm("Are you sure you want to delete"))
	  this.service.deletePaymentDetail(id).subscribe(
		  {
			  next: res => {
				  this.service.list = res as PaymentDetail[]
				  this.toastr.error('Deleted Successfully', 'Payment Details Register')
			  },
			  error: err => {
				  console.log(err)
			  }
		  }
	  )
  }
}
