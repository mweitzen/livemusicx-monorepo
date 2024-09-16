import { ManyToOne } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { VersionedResource } from '../common/resource.entity';
import {
  PerformerUser,
  VenueUser,
  OrganizerUser,
  AssociateUser,
} from '../user';

export abstract class UserOwnedResource extends VersionedResource {
  // @ManyToOne(() => PerformerUser, (account) => account.createdEvents)
  // @JoinColumn({ name: 'createdById' })
  // createdByPerformer: PerformerUser;
  // @ManyToOne(() => VenueUser, (account) => account.createdEvents)
  // @JoinColumn({ name: 'createdById' })
  // createdByVenue: VenueUser;
  // @ManyToOne(() => OrganizerUser, (account) => account.createdEvents)
  // @JoinColumn({ name: 'createdById' })
  // createdByOrganizer: OrganizerUser;
  // @ManyToOne(() => AssociateUser, (account) => account.createdEvents)
  // @JoinColumn({ name: 'createdById' })
  // createdByAssociate: AssociateUser;
  // @ManyToOne(() => PerformerUser, (user) => user.eventEdits)
  // @JoinColumn({ name: 'lastUpdatedById' })
  // lastUpdatedByPerformer: PerformerUser;
  // @ManyToOne(() => VenueUser, (user) => user.eventEdits)
  // @JoinColumn({ name: 'lastUpdatedById' })
  // lastUpdatedByVenue: VenueUser;
  // @ManyToOne(() => OrganizerUser, (user) => user.eventEdits)
  // @JoinColumn({ name: 'lastUpdatedById' })
  // lastUpdatedByOrganizer: OrganizerUser;
  // @ManyToOne(() => AssociateUser, (user) => user.eventEdits)
  // @JoinColumn({ name: 'lastUpdatedById' })
  // lastUpdatedByAssociate: AssociateUser;
}
