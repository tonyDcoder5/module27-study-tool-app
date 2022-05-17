export default function Card({card}) {

    console.log(card)

  return (
      <tr key={card.id} className="d-flex">
        <td>{card.front}</td>
        <td>
        {card.back}
          <br />
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
  );
}
