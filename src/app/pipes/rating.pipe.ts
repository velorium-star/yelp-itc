import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "rating"
})
export class RatingPipe implements PipeTransform {
  transform(value: number, ...args: any[]): any {
    const valueTruncated = Math.trunc(value);
    let result = `assets/images/large/large_${valueTruncated}`;

    if (value > valueTruncated) {
      result += "_half";
    }

    result += "@2x.png";

    return result;
  }
}
