import { useState } from "react";
import { api } from "@repo/trpc/react";

import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

export const BlankPage = () => {
  const [query, setQuery] = useState("");
  const [take, setTake] = useState(20);
  const [page, setPage] = useState(1);
  // const [];
  // const { data, isLoading } = api.events.getUpcoming.useQuery({
  //   query,
  //   take,
  //   page,
  // });
  const { data, isLoading } = api.profiles.bands.getAll.useQuery();
  // const { data, isLoading } = api.events.getDetails.useQuery({
  //   id: "clsa4zqw9000crrwbe7n0tl3z",
  // });

  return (
    <div>
      <div className='flex gap-1'>
        <Input
          name='query'
          placeholder='Search Query'
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <Input
          name='take'
          placeholder='Display Amount'
          type='number'
          onChange={(e) => setTake(Number(e.target.value))}
          value={take}
        />
        <Input
          name='page'
          placeholder='Page'
          type='number'
          onChange={(e) => setPage(Number(e.target.value))}
          value={page}
        />
      </div>
      {isLoading ? (
        <p>Loading....</p>
      ) : data?.length ? (
        data.map((item) => (
          <Card key={item.id}>
            <CardHeader />
            <CardContent>
              <p>{item.name}</p>
              {/* <p>
                {item.timeStart!.toDateString()} -{" "}
                {item.timeEnd?.toDateString()}
              </p>
              <p>
                {item.musicians[0]?.profile.name}
                {item.bands[0]?.profile.name}
              </p>
              <p>
                {item.musicians[0]?.profile.about}
                {item.bands[0]?.profile.about}
              </p> */}
              <p>Members</p>
              {item.members.map((m) => (
                <p key={m.id}>{m.profile.name}</p>
              ))}
              <br />
              {Object.entries(item).map((obj) => (
                <div key={obj[0]}>
                  <p>
                    {obj[0]} ------------ {obj[1]?.toString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))
      ) : (
        <p>Nothing.</p>
      )}
      {/* {isLoading ? (
        <p>Loading....</p>
      ) : data ? (
        <p key={data.id}>{data.name}</p>
      ) : (
        <p>Not found.</p>
      )} */}
    </div>
  );
};
