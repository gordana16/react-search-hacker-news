import React from "react";

const Table = ({ list, onDismiss }) => (
  <table className="table table-sm">
    <thead className="thead-dark">
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th className="text-center">Comments</th>
        <th scope="col" className="text-center">
          Points
        </th>
        <th scope="col" />
      </tr>
    </thead>
    <tbody>
      {list.map(item => (
        <tr key={item.objectID}>
          <td>
            <a href={item.url}>{item.title}</a>
          </td>
          <td>{item.author}</td>
          <td className="text-center">{item.num_comments}</td>
          <td className="text-center">{item.points}</td>
          <td className="pl-5">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDismiss(item.objectID)}
            >
              Dismiss
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
