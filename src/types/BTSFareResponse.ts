export interface BTSFareResponse {
    TrafficUpDate: string;
    TravelIcon?: (null)[] | null;
    MainLineStatus?: (null)[] | null;
    FareRate: (FareRateEntity)[];
    TimeTable: TimeTable;
    TrafficAlert: TrafficAlert;
    OriginName: string;
    TotalKm: string;
    TotalTime: string;
    Routes?: (null)[] | null;
    DestinationName: string;
    DestinationDetail: string;
    DestinationLat: string;
    DestinationLong: string;
    LocationNumber: string;
    ErrCode: number;
    IsSuccess: boolean;
    ErrMessage: string;
}

export interface FareRateEntity {
    FarePrice_Gold: string;
    FareIcon: string;
    FareDetail: string;
    FarePrice: string;
    FareDetail_ENG: string;
    IsDetail: boolean;
    DetailImage: string;
}

export interface TimeTable {
    StationId: number;
    StationName: string;
    StationKey: string;
    LineColor: string;
    BTSInterval: string;
    BTSIntervalWidth: number;
    BTSIntervalHeight: number;
    PlatformFirst?: (null)[] | null;
    PlatformLast?: (null)[] | null;
    PlatformExtra?: (null)[] | null;
}
export interface TrafficAlert {
    TrAlertID: number;
    TrPlanID: number;
    TrTypeID: number;
    LineID: number;
    LineColor: string;
    LineName: string;
    AlertTime: string;
    PlanName: string;
    TypeName: string;
    Detail: string;
    Images: string;
    Url: string;
}
