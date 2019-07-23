interface User {
  name: string;
}

const HelloWord = (user: User): string => `Hello ${user.name}`;

export default HelloWord;
