import { Person, Person_PhoneType } from "./addressbook";

const p: Person = {
  name: "John",
  phones: [{ number: "12345678", type: Person_PhoneType.MOBILE }],
  id: 1,
  lastUpdated: new Date(),
  email: "john@aol.com",
};

console.log(p);
