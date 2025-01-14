import axios from "axios";
import { CheckoutSessionRequest, UserPremiumSubscribeRequest } from "../models/dto/requests/PaymentRequest";
import { paymentApiUrl } from "@/constant";
import { GetAccessToken } from "./auth/auth_get_token";

//* ------------------ These functions will use instead ------------------ *//
export async function getCheckoutSessionUrl(checkoutSessionRequest: CheckoutSessionRequest)  {

   const apiUrl = `${paymentApiUrl}/subscription/get-url`

   try {
      const accessToken = await GetAccessToken()
      const requestOption = {
         headers: {
            "Authorization": `Bearer ${accessToken}`,
         },
      }

      const response = await axios.post(
         apiUrl,
         checkoutSessionRequest,
         requestOption
      );

      if (response.status != 201) {
         return
      } else {
         return response.data.url;
      }

   }
    catch (error) {

      // TODO : Handle error
      // TODO logic to get new Access Token from Refresh Token
      // Some code..
      // Some code..
      // Some code..

      console.error(error);
      return "";
   }
}

export async function userPremiumSubscribe(userPremiumSubscribeRequest: UserPremiumSubscribeRequest) {
   const apiUrl = `${paymentApiUrl}/subscription/success`
   try {
      const accessToken = await GetAccessToken()
      const requestOption = {
         headers: {
            "Authorization": `Bearer ${accessToken}`,
         },
      }

      const response = await axios.post(
         apiUrl,
         userPremiumSubscribeRequest,
         requestOption
      );

      if (response.status != 201) {

         // TODO maybe return cancel subscription url
         // return response.data.cancel_url;
      }

      return response.data

   } catch (error) {
      // TODO : Handle error
      // TODO logic to get new Access Token from Refresh Token
      // Some code..
      // Some code..
      // Some code..

      console.error(error);
   }
}


export async function cancelUserSubscribe() {
   const apiUrl = `${paymentApiUrl}/subscription/cancle`
   try {
      const accessToken = await GetAccessToken()
      const requestOption = {
         headers: {
            "Authorization": `Bearer ${accessToken}`,
         },
      }

      const response = await axios.delete(apiUrl,requestOption);

      if (response.status != 200) {
         return null
      }

      return response.data

   } catch (error) {
      // TODO : Handle error
      // TODO logic to get new Access Token from Refresh Token
      // Some code..
      // Some code..
      // Some code..

      console.error(error);
      return null
   }
}