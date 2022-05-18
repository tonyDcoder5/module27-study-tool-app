export default function CardList({cards}) {


  console.log(cards)
  
  cards.forEach((card)=> {
    
    console.log(card)

    return (
        <div key={card.id} className="card row">
          <div>{card.front}</div>
          <div>
          {card.back}
            <br />
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
    );
  })

}
