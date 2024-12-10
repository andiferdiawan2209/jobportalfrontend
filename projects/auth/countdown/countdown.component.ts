import { Component } from '@angular/core';

@Component({
    selector: 'app-countdown',
    templateUrl: './countdown.component.html',
    styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent {
    minutes: number = 0;
    seconds: number = 60;
    private countdownInterval: any;

    ngOnInit(): void {
        this.startCountdown();
    }

    startCountdown(): void {
        this.countdownInterval = setInterval(() => {
            if (this.seconds > 0) {
                this.seconds--;
            } else if (this.minutes > 0) {
                this.minutes--;
                this.seconds = 59;
            } else {
                clearInterval(this.countdownInterval);
                console.log('Countdown complete');
            }
        }, 1000);
    }

    ngOnDestroy(): void {
        clearInterval(this.countdownInterval);
    }
}
