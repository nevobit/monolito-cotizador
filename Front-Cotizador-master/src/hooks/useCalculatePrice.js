import { useEffect } from "react";

export default function useCalculatePrices(product, isMark) {
  useEffect(() => {
    product.markings.forEach((mark, j) => {
      switch (product.typeOfPrice) {
        case "net":
          mark.netPrice = product.price;
          break;
        case "offer":
          mark.netPrice = product.price * 0.6 * 0.85;
          break;
        case "full":
          mark.netPrice = product.price * 0.6;
          break;
        default:
          break;
      }

      if (product.discount && discount && discount.ranges.length > 0) {
        let inRange = false;
        for (const range of discount.ranges) {
          if (
            mark.amount * mark.netPrice >= range.min &&
            mark.amount * mark.netPrice <= range.max
          ) {
            mark.netPrice = mark.netPrice * ((100 - range.discount) / 100);
            inRange = true;
            break;
          } else if (mark.amount * mark.netPrice < range.min) {
            inRange = true;
          }
        }
        if (!inRange) {
          mark.netPrice =
            mark.netPrice * ((100 - discount.outOfRangeDiscount) / 100);
        }
      }

      if (product.usbDiscount && usbDiscount && usbDiscount.ranges.length > 0) {
        let inRange = false;
        for (const range of usbDiscount.ranges) {
          if (mark.amount >= range.min && mark.amount <= range.max) {
            mark.netPrice = mark.netPrice * ((100 - range.discount) / 100);
            inRange = true;
            break;
          } else if (mark.amount < range.min) {
            inRange = true;
          }
        }
        if (!inRange) {
          mark.netPrice =
            mark.netPrice * ((100 - usbDiscount.outOfRangeDiscount) / 100);
        }
      }

      let sum = 0;
      if (mark.ink) {
        let inRange = false;
        for (const ran of mark.ink.ranges) {
          if (mark.amount >= ran.min && mark.amount <= ran.max) {
            sum = mark.amount * ran.price;
            inRange = true;
            break;
          } else if (mark.amount < ran.min) {
            sum = mark.ink.minTotalPrice;
            inRange = true;
          }
        }
        if (!inRange) {
          sum += mark.ink.outOfRangePrice * mark.amount;
        }
      }

      if (sum > 0) {
        if (!isMark) {
          product.markings[j].markingPrice = sum / mark.amount;
        }
      } else {
        product.markings[j].markingPrice = 0;
      }

      let amount = mark.amount;
      let freightValue = product.markings[j].freight;
      let utility = product.markings[j].profit;
      let price =
        product.typeOfPrice === "net"
          ? product.price
          : product.typeOfPrice === "offer"
          ? product.price * 0.6 * 0.85
          : product.price * 0.6;

      if (product.discount && discount && discount.ranges.length > 0) {
        let inRange = false;
        for (const range of discount.ranges) {
          if (amount * price >= range.min && amount * price <= range.max) {
            price = price * ((100 - range.discount) / 100);
            inRange = true;
            break;
          } else if (amount * price < range.min) {
            inRange = true;
          }
        }
        if (!inRange) {
          price = price * ((100 - discount.outOfRangeDiscount) / 100);
        }
      }
      let markingValue = product.markings[j].markingPrice;

      let realUtility = (100 - utility) / 100;
      let initialUtility = price / realUtility - price;
      let totalProfitValue = initialUtility * amount;
      let unitPrice = price / realUtility + freightValue + markingValue;
      let totalPrice = unitPrice * amount;

      product.markings[j].unitPrice = unitPrice;
      product.markings[j].totalProfit = totalProfitValue;
      product.markings[j].totalPrice = totalPrice;
    });

    return product;
  }, [product, isMark]);
}
