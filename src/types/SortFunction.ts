import { Account, Campaign, Profile } from ".";

export type AccountSort = (a: Account , b: Account) => number;
export type ProfileSort = (a: Profile , b: Profile) => number;
export type CampaignSort = (a: Campaign , b: Campaign) => number;