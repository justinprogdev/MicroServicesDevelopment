/* eslint-disable */
import { Timestamp } from "./google/protobuf/timestamp";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface Person {
  name: string;
  /** Unique ID number for this person. */
  id: number;
  email: string;
  phones: Person_PhoneNumber[];
  lastUpdated: Date | undefined;
}

export enum Person_PhoneType {
  MOBILE = 0,
  HOME = 1,
  WORK = 2,
  UNRECOGNIZED = -1,
}

export function person_PhoneTypeFromJSON(object: any): Person_PhoneType {
  switch (object) {
    case 0:
    case "MOBILE":
      return Person_PhoneType.MOBILE;
    case 1:
    case "HOME":
      return Person_PhoneType.HOME;
    case 2:
    case "WORK":
      return Person_PhoneType.WORK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Person_PhoneType.UNRECOGNIZED;
  }
}

export function person_PhoneTypeToJSON(object: Person_PhoneType): string {
  switch (object) {
    case Person_PhoneType.MOBILE:
      return "MOBILE";
    case Person_PhoneType.HOME:
      return "HOME";
    case Person_PhoneType.WORK:
      return "WORK";
    case Person_PhoneType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Person_PhoneNumber {
  number: string;
  type: Person_PhoneType;
}

/** Our address book file is just one of these. */
export interface AddressBook {
  people: Person[];
}

function createBasePerson(): Person {
  return { name: "", id: 0, email: "", phones: [], lastUpdated: undefined };
}

export const Person = {
  encode(
    message: Person,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.id !== 0) {
      writer.uint32(16).int32(message.id);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    for (const v of message.phones) {
      Person_PhoneNumber.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.lastUpdated !== undefined) {
      Timestamp.encode(
        toTimestamp(message.lastUpdated),
        writer.uint32(42).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Person {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePerson();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.id = reader.int32();
          break;
        case 3:
          message.email = reader.string();
          break;
        case 4:
          message.phones.push(
            Person_PhoneNumber.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.lastUpdated = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Person {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      id: isSet(object.id) ? Number(object.id) : 0,
      email: isSet(object.email) ? String(object.email) : "",
      phones: Array.isArray(object?.phones)
        ? object.phones.map((e: any) => Person_PhoneNumber.fromJSON(e))
        : [],
      lastUpdated: isSet(object.lastUpdated)
        ? fromJsonTimestamp(object.lastUpdated)
        : undefined,
    };
  },

  toJSON(message: Person): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.email !== undefined && (obj.email = message.email);
    if (message.phones) {
      obj.phones = message.phones.map((e) =>
        e ? Person_PhoneNumber.toJSON(e) : undefined
      );
    } else {
      obj.phones = [];
    }
    message.lastUpdated !== undefined &&
      (obj.lastUpdated = message.lastUpdated.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Person>, I>>(object: I): Person {
    const message = createBasePerson();
    message.name = object.name ?? "";
    message.id = object.id ?? 0;
    message.email = object.email ?? "";
    message.phones =
      object.phones?.map((e) => Person_PhoneNumber.fromPartial(e)) || [];
    message.lastUpdated = object.lastUpdated ?? undefined;
    return message;
  },
};

function createBasePerson_PhoneNumber(): Person_PhoneNumber {
  return { number: "", type: 0 };
}

export const Person_PhoneNumber = {
  encode(
    message: Person_PhoneNumber,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.number !== "") {
      writer.uint32(10).string(message.number);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Person_PhoneNumber {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePerson_PhoneNumber();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.number = reader.string();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Person_PhoneNumber {
    return {
      number: isSet(object.number) ? String(object.number) : "",
      type: isSet(object.type) ? person_PhoneTypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: Person_PhoneNumber): unknown {
    const obj: any = {};
    message.number !== undefined && (obj.number = message.number);
    message.type !== undefined &&
      (obj.type = person_PhoneTypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Person_PhoneNumber>, I>>(
    object: I
  ): Person_PhoneNumber {
    const message = createBasePerson_PhoneNumber();
    message.number = object.number ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseAddressBook(): AddressBook {
  return { people: [] };
}

export const AddressBook = {
  encode(
    message: AddressBook,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.people) {
      Person.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddressBook {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddressBook();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.people.push(Person.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddressBook {
    return {
      people: Array.isArray(object?.people)
        ? object.people.map((e: any) => Person.fromJSON(e))
        : [],
    };
  },

  toJSON(message: AddressBook): unknown {
    const obj: any = {};
    if (message.people) {
      obj.people = message.people.map((e) =>
        e ? Person.toJSON(e) : undefined
      );
    } else {
      obj.people = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddressBook>, I>>(
    object: I
  ): AddressBook {
    const message = createBaseAddressBook();
    message.people = object.people?.map((e) => Person.fromPartial(e)) || [];
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
