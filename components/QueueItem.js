import React from 'react';
import { FaTrash, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import QueueStyle from '../styles/QueueStyle';

export default ({ index, item, session, onRemoveItem, onVoteUp, onVoteDown }) => {
  return (
    <tr>
      <style jsx>{QueueStyle}</style>
      <td data-label="Arte">
        <img src={item.track.album.images[2].url} width="40" height="40" />
      </td>
      <td data-label="Posição">
        {index + 1}
      </td>
      <td data-label="Música">
        {item.track.name}
      </td>
      <td data-label="Artista">
        {item.track.artists.map(a => a.name).join(', ')}
      </td>
      <td data-label="Usuário">
        {item.user && (item.user.display_name || item.user.id)}
      </td>
      <td data-label="Like">
        {item.user && session.user && item.user.id !== session.user.id ? <button className="btn-thumbs-up" onClick={onVoteUp}><FaThumbsUp/></button> : <button className="btn-thumbs-up-disabled"><FaThumbsUp/></button>}
      </td>
      <td data-label="Dislike">
        {item.user && session.user && item.user.id === session.user.id ? (<button className="btn-thumbs-down" onClick={() => {onRemoveItem(item.id);}}><FaTrash/></button>) : (item.user && session.user ? <button className="btn-thumbs-down" onClick={onVoteDown}><FaThumbsDown/></button> : <button className="btn-thumbs-down-disabled"><FaThumbsDown/></button>)}
      </td>
      <td data-label="Votos">
        {<span>{(item.likes && item.likes.length > 0) ? item.likes.length : '0'}</span>} {<span> / </span>} {<span>{(item.unlikes && item.unlikes.length > 0) ? item.unlikes.length : '0'}</span>}
      </td>
    </tr>
  );
};