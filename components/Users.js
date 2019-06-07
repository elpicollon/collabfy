import React from 'react';
import { FaUser } from 'react-icons/fa';
import UserStyle from '../styles/UserStyle';

export default ({ items }) => {
  return (
    <div>
      <style jsx>{UserStyle}</style>
      <h2>Online</h2>
      <div>
        {items.map((i, index) => {
          const userName = i && (i.display_name || i.id) || '';
          const country = i && ("Country: " + (i.country || 'N/A'))  || '';
          const followers = i && i.followers && i.followers.total  || '0';
          
          return (  
            <div key={index} className="user-list__item media">
              <div className="media__img">
                <img className="user-image" src={(i && i.images && i.images.length && i.images[0].url) || '/static/user-icon.png'} width="30" height="30" alt={userName} title={userName}/>
              </div>
              <div className="user-name media__bd">
                {userName}
              </div>
              <div className="user-country">
                {country}
              </div>
              <div className="user-followers">
                <FaUser /> {followers}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
