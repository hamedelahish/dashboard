export interface IOrderResponseItem {
    orderId: number;
    customerName: string;
    orderStatus: string;
    statusId: number;
    orderDate: string;

  }
  
  export interface IOrderResponseDetail {
    orderId: number
    orderDate: string
    orderTotalPrice: number
    orderStatusId: number
    customerId: number
    customerName: string
    customerEmail: string
    customerPhone: string
    customerAddress: string
    orderDetails: IOrderResponseDetailItem[]
  }
  
  export interface IOrderResponseDetailItem {
    productId: number
    productName: string
    productPrice: number
    quantity: number
    orderDetailTotalPrice: number
  }
  

  export interface IOrderResponse {
    statusId: number
    statusName: string
    isDeleted: boolean
    createDate: string
    updateDate: string
  }
  