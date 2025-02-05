//import ProfileCard from "./components/ProfileCard.tsx";
//import Counter from "./components/Counter.tsx";
import ToDoList from "./components/ToDoList.tsx";

// type User = {
//   name: string;
//   job: string;
//   year: number;
// };

// const Users: User[] = [
//   {
//     name: "fikry",
//     job: "software engineer",
//     year: 2000,
//   },
//   {
//     name: "budi",
//     job: "tech engineer",
//     year: 1999,
//   },
//   {
//     name: "danu",
//     job: "database engineer",
//     year: 2002,
//   },
// ];

function App() {
  return (
    <div>
      {/* <div className="flex gap-4">
        {Users.map((User) => {
          return <ProfileCard {...User} />;
          //<ProfileCard name={User.name} job={User.job} year={User.year} />
        })}
      </div>
      <div>
        <Counter />
      </div> */}
      <div>
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
