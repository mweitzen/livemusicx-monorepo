import { z } from "zod";
import { $Enums } from "@repo/db/schema";

export const GroupSize = z.enum([
  "small", // 2-4
  "medium", // 5-8
  "large", // 9+
]);

export const VenueType = z.nativeEnum($Enums.VenueType);
export const StageType = z.nativeEnum($Enums.StageType);
export const UserRole = z.nativeEnum($Enums.UserRole);
export const AccountType = z.nativeEnum($Enums.AccountType);
export const EventStatus = z.nativeEnum($Enums.EventStatus);
export const ProfileType = z.nativeEnum($Enums.ProfileType);
export const AnnouncementType = z.nativeEnum($Enums.AnnouncementType);
export const BroadcastAudience = z.nativeEnum($Enums.BroadcastAudience);
export const BulletinType = z.nativeEnum($Enums.BulletinType);
export const LocationType = z.nativeEnum($Enums.LocationType);
export const NetworkType = z.nativeEnum($Enums.NetworkType);
export const PostType = z.nativeEnum($Enums.PostType);
