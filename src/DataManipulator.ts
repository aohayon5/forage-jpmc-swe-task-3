import {ServerRespond} from './DataStreamer';

export interface Row {
    price_stock1: number,
    price_stock2: number,
    ratio: number,
    timestamp: Date,
    upper_bound: number,
    lower_bound: number,
    trigger_alert: number | undefined,
}


export class DataManipulator { //why changes premade...
    static generateRow(serverRespond: ServerRespond[]): Row {
        const pricestock1 = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) / 2;
        const pricestock2 = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
        const ratio = pricestock1 / pricestock2;
        const upperBound = 1 + 0.05;
        const lowerBound = 1 - 0.05;
        return {
            price_stock1: pricestock1,
            price_stock2: pricestock2,
            ratio,
            timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
                serverRespond[0].timestamp : serverRespond[1].timestamp,
            upper_bound: upperBound,
            lower_bound: lowerBound,
            trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
        };
    }
}
