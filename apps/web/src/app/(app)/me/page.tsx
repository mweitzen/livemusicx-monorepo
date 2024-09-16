import UserCard from "./user-card";
import UserSettings from "./user-settings";
import UserButtons from "./user-buttons";
import UserLinks from "./user-links";

export default function MusicFanAccount() {
  return (
    <div className='p-6'>
      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='w-full lg:w-1/4 space-y-6'>
          <UserCard />
          <UserLinks />
        </div>
        <div className='flex-1'>
          <UserSettings />
        </div>
      </div>
      <UserButtons />
    </div>
  );
}
