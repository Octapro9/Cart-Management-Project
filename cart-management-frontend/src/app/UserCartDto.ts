export interface UserCartDto {
    user: {
        userId:number,
        name: string,
        password : string,
        email : string,
        userType : string

    };
    carts: {
        cartId: number;
        item: {
          itemId: number;
          itemName: string;
          description: string;
          price: number;
        };
        quantity: number;
      }[];

  }
  