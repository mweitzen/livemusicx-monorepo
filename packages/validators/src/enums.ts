import { z } from "zod";
import {
  VenueType as NativeVenueType,
  StageType as NativeStageType,
  UserRole as NativeUserRole,
  AccountType as NativeAccountType,
  EventStatus as NativeEventStatus,
} from "@repo/db/schema";

export const GroupSize = z.enum([
  "small", // 2-4
  "medium", // 5-8
  "large", // 9+
]);

export const VenueType = z.nativeEnum(NativeVenueType);

export const StageType = z.nativeEnum(NativeStageType);

export const UserRole = z.nativeEnum(NativeUserRole);

export const AccountType = z.nativeEnum(NativeAccountType);

export const EventStatus = z.nativeEnum(NativeEventStatus);
