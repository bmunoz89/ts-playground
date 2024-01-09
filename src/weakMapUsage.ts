/** Basic User class with common properties. */
class User {
  readonly username: string;
  readonly fullName: string;
  readonly age: number;
  readonly gender: string;

  constructor(username: string, fullName: string, age: number, gender: string) {
    this.username = username;
    this.fullName = fullName;
    this.age = age;
    this.gender = gender;
  }

  print() {
    console.log(`${this.fullName} is a ${this.age} year old ${this.gender}`);
  }
}

/** Collection of Users, keyed by username. */
const users: Map<string, User> = new Map();

type AddUser = (...args: ConstructorParameters<typeof User>) => void;

/** Creates an User Object and adds it to the users Collection. */
const addUser: AddUser = function (username, fullName, age, gender) {
  const user: User = new User(username, fullName, age, gender);
  users.set(username, user);
};

/** Returns an User Object associated with the given username in the Collection. */
function getUser(username: string): User | undefined {
  return users.get(username);
}

/** Deletes an User Object associated with the given username in the Collection. */
function deleteUser(username: string): void {
  users.delete(username);
}

/** Prints summary of all the User Objects in the Collection. */
function printUsers(): void {
  users.forEach((user: User): void => user.print());
}

/** Prints the User's full name and corresponding SMP link of only those Users which are on the given SMP. */
function printSMPUsers(smPlatform: SMPlatforms): void {
  const selectedSMPlatform = smPlatforms[smPlatform];
  console.log(`Users of ${smPlatform}:`);

  users.forEach((user) => {
    if (selectedSMPlatform.has(user)) {
      console.log(`\t${user.fullName} : ${selectedSMPlatform.get(user)}`);
    }
  });
}

/** WeakMaps for Social Media Platforms (SMPs). */
const smPlatforms = {
  Twitter: new WeakMap<User, string>(),
  Facebook: new WeakMap<User, string>(),
  LinkedIn: new WeakMap<User, string>(),
} as const;

type SMPlatforms = keyof typeof smPlatforms;

/** Adds a SMP link associated with a given User. The User must be already added to the Collection. */
function addUserSocialMediaLink(
  username: string,
  smPlatform: SMPlatforms,
  smLink: string
): void {
  const user: User | undefined = getUser(username);
  const selectedSMPlatform: WeakMap<User, string> = smPlatforms[smPlatform];

  if (user) {
    selectedSMPlatform.set(user, smLink);
  }
}

addUser("boris", "Boris Muñoz", 33, "Male");
addUserSocialMediaLink("boris", "Facebook", "boris.munoz");
addUserSocialMediaLink("boris", "Twitter", "bmunozc89");

addUser("molly", "Molly Shizuku", 1, "Female");
addUserSocialMediaLink("molly", "Twitter", "molly.shish.tzy");

addUser("denisse", "Denisse Falcon", 33, "Female");
addUserSocialMediaLink("denisse", "LinkedIn", "denisse.falcon");

printUsers();
console.log("-------------");
printSMPUsers("Facebook");
console.log("-------------");
printSMPUsers("Twitter");
console.log("-------------");
printSMPUsers("LinkedIn");

deleteUser("boris");

console.log("-------------");
console.log("-------------");

printUsers();
console.log("-------------");
printSMPUsers("Facebook");
console.log("-------------");
printSMPUsers("Twitter");
console.log("-------------");
printSMPUsers("LinkedIn");
