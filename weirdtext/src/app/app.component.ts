import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { config } from 'rxjs';
import { ApiService } from './services/api.service';
import { LogService } from './services/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weirdtext';

  // User input
  public messageToEncode: string = "";
  public messageToDecode: string = "";
  public listOfWords: Array<string> = [];

  // API output
  public encodedMessage: string = "";
  public decodedMessage: string = "";
  public originalWords: Array<string> = [];

  // Controlers
  public decodingError: boolean = false;
  public validInput: boolean = true;

  constructor(private apiService: ApiService, private logService: LogService, private snackbar: MatSnackBar) { }

  encode() {
    // Send API request to encode message
    this.apiService.encode(this.messageToEncode).subscribe(
      res => {
        this.logService.log(res);
        if (res.ok) {
          this.encodedMessage = res.encoded_message;
          this.originalWords = res.original_words;
          this.snackbar.open("Message sent to encode", "Close", { duration: 5000 });
        }
      }, err => {
        this.logService.log(err);
      }
    );
  }

  decode() {
    // Send API request to decode message
    this.apiService.decode(this.messageToDecode, this.listOfWords).subscribe(
      res => {
        this.logService.log(res);
        if (res.ok) {
          this.decodedMessage = res.decoded_message;
          this.decodingError = false;
          this.snackbar.open(res.ok, "Close", { duration: 5000 });
        } else if (res.error) {
          this.decodingError = true;
          this.decodedMessage = res.error_type;
          this.snackbar.open(res.error, "Close", { duration: 5000 });
        }
      }, err => {
        this.logService.log(err);
      }
    );
  }

  fillDecoder() {
    // Move encoded message and list of words to decoder fields
    this.messageToDecode = this.encodedMessage;
    this.listOfWords = this.originalWords;
    this.snackbar.open("Message moved to decoder", "Close", { duration: 5000 });
  }

  copy() {
    this.snackbar.open("Copied to clipboard", "Close", { duration: 5000 });
  }

  checkInput(event) {
    var textToDecode: string = event.target.value;
    var magicWordSeparator: string = "\n--weird--\n"
    this.validInput = textToDecode.startsWith(magicWordSeparator) && textToDecode.endsWith(magicWordSeparator);
  }

}
