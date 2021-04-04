import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { getLinksQuery, LinksCollection } from "../api/links";

export const Info = () => {
  const [skip, setSkip] = useState(0);

  const { loading, links } = useTracker(() => {
    const query = getLinksQuery.clone({
      limit: 1,
      skip,
    });
    const handle = query.subscribe();

    return {
      loading: !!handle.ready(),
      links: query.fetch(),
    };
  }, [skip]);

  // console.log(links);

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>
        {links?.map((link) => (
          <li key={link._id}>
            <a href={link.url} target="_blank">
              {link.title}
            </a>
            <a onClick={() => Meteor.call("removeLink", link._id)}>&times;</a>
          </li>
        ))}
      </ul>
      <button onClick={() => setSkip(skip - 1)}>Prev</button>
      <button onClick={() => setSkip(skip + 1)}>Next</button>
    </div>
  );
};
