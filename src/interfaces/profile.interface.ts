import {LandLordProfile, TenantProfile, Preference} from '../generated/prisma'

export interface tenantProfileInterface  extends TenantProfile{
    firstName: string
    otherName: string
    lastName: string
    phoneNumber: string
    street: string
    city:string
    state:string
    NIN:string
}

export interface landLordProfileInterface  extends LandLordProfile{
    firstName: string
    otherName: string
    lastName: string
    phoneNumber: string
    NIN:string
    BVN:string
    OtherInfo:string
    address:string
    preferences: Preference
}