export type LoginUser = {
  id?: number;
  firebase_id?: string;
  name?: string;
  email: string;
  profilepic: string;
  subscriptionId?: number;
  plan_id?: number;
  planType: string;
  maxMessages?: number;
  start_date?: Date;
  end_date?: Date;
  access_token?: string;
  platform?: string;
};