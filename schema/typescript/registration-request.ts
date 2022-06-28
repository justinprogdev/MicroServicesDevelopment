/* eslint-disable */
import { Timestamp } from "./google/protobuf/timestamp";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface RegistrationRequest {
  student: RegistrationRequest_Student | undefined;
  course: RegistrationRequest_Course | undefined;
  offering: RegistrationRequest_Offering | undefined;
  created: Date | undefined;
}

export interface RegistrationRequest_Student {
  email: string;
  id: string;
}

export interface RegistrationRequest_Course {
  courseId: string;
  courseName: string;
  numberOfDays: number;
}

export interface RegistrationRequest_Offering {
  offeringId: string;
  startDate: Date | undefined;
  numberOfDays: number;
}

function createBaseRegistrationRequest(): RegistrationRequest {
  return {
    student: undefined,
    course: undefined,
    offering: undefined,
    created: undefined,
  };
}

export const RegistrationRequest = {
  encode(
    message: RegistrationRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.student !== undefined) {
      RegistrationRequest_Student.encode(
        message.student,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.course !== undefined) {
      RegistrationRequest_Course.encode(
        message.course,
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.offering !== undefined) {
      RegistrationRequest_Offering.encode(
        message.offering,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.created !== undefined) {
      Timestamp.encode(
        toTimestamp(message.created),
        writer.uint32(34).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RegistrationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegistrationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.student = RegistrationRequest_Student.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.course = RegistrationRequest_Course.decode(
            reader,
            reader.uint32()
          );
          break;
        case 3:
          message.offering = RegistrationRequest_Offering.decode(
            reader,
            reader.uint32()
          );
          break;
        case 4:
          message.created = fromTimestamp(
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

  fromJSON(object: any): RegistrationRequest {
    return {
      student: isSet(object.student)
        ? RegistrationRequest_Student.fromJSON(object.student)
        : undefined,
      course: isSet(object.course)
        ? RegistrationRequest_Course.fromJSON(object.course)
        : undefined,
      offering: isSet(object.offering)
        ? RegistrationRequest_Offering.fromJSON(object.offering)
        : undefined,
      created: isSet(object.created)
        ? fromJsonTimestamp(object.created)
        : undefined,
    };
  },

  toJSON(message: RegistrationRequest): unknown {
    const obj: any = {};
    message.student !== undefined &&
      (obj.student = message.student
        ? RegistrationRequest_Student.toJSON(message.student)
        : undefined);
    message.course !== undefined &&
      (obj.course = message.course
        ? RegistrationRequest_Course.toJSON(message.course)
        : undefined);
    message.offering !== undefined &&
      (obj.offering = message.offering
        ? RegistrationRequest_Offering.toJSON(message.offering)
        : undefined);
    message.created !== undefined &&
      (obj.created = message.created.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegistrationRequest>, I>>(
    object: I
  ): RegistrationRequest {
    const message = createBaseRegistrationRequest();
    message.student =
      object.student !== undefined && object.student !== null
        ? RegistrationRequest_Student.fromPartial(object.student)
        : undefined;
    message.course =
      object.course !== undefined && object.course !== null
        ? RegistrationRequest_Course.fromPartial(object.course)
        : undefined;
    message.offering =
      object.offering !== undefined && object.offering !== null
        ? RegistrationRequest_Offering.fromPartial(object.offering)
        : undefined;
    message.created = object.created ?? undefined;
    return message;
  },
};

function createBaseRegistrationRequest_Student(): RegistrationRequest_Student {
  return { email: "", id: "" };
}

export const RegistrationRequest_Student = {
  encode(
    message: RegistrationRequest_Student,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegistrationRequest_Student {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegistrationRequest_Student();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegistrationRequest_Student {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: RegistrationRequest_Student): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegistrationRequest_Student>, I>>(
    object: I
  ): RegistrationRequest_Student {
    const message = createBaseRegistrationRequest_Student();
    message.email = object.email ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseRegistrationRequest_Course(): RegistrationRequest_Course {
  return { courseId: "", courseName: "", numberOfDays: 0 };
}

export const RegistrationRequest_Course = {
  encode(
    message: RegistrationRequest_Course,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.courseId !== "") {
      writer.uint32(10).string(message.courseId);
    }
    if (message.courseName !== "") {
      writer.uint32(18).string(message.courseName);
    }
    if (message.numberOfDays !== 0) {
      writer.uint32(24).int32(message.numberOfDays);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegistrationRequest_Course {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegistrationRequest_Course();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.courseId = reader.string();
          break;
        case 2:
          message.courseName = reader.string();
          break;
        case 3:
          message.numberOfDays = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegistrationRequest_Course {
    return {
      courseId: isSet(object.courseId) ? String(object.courseId) : "",
      courseName: isSet(object.courseName) ? String(object.courseName) : "",
      numberOfDays: isSet(object.numberOfDays)
        ? Number(object.numberOfDays)
        : 0,
    };
  },

  toJSON(message: RegistrationRequest_Course): unknown {
    const obj: any = {};
    message.courseId !== undefined && (obj.courseId = message.courseId);
    message.courseName !== undefined && (obj.courseName = message.courseName);
    message.numberOfDays !== undefined &&
      (obj.numberOfDays = Math.round(message.numberOfDays));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegistrationRequest_Course>, I>>(
    object: I
  ): RegistrationRequest_Course {
    const message = createBaseRegistrationRequest_Course();
    message.courseId = object.courseId ?? "";
    message.courseName = object.courseName ?? "";
    message.numberOfDays = object.numberOfDays ?? 0;
    return message;
  },
};

function createBaseRegistrationRequest_Offering(): RegistrationRequest_Offering {
  return { offeringId: "", startDate: undefined, numberOfDays: 0 };
}

export const RegistrationRequest_Offering = {
  encode(
    message: RegistrationRequest_Offering,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.offeringId !== "") {
      writer.uint32(10).string(message.offeringId);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(
        toTimestamp(message.startDate),
        writer.uint32(18).fork()
      ).ldelim();
    }
    if (message.numberOfDays !== 0) {
      writer.uint32(24).int32(message.numberOfDays);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegistrationRequest_Offering {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegistrationRequest_Offering();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.offeringId = reader.string();
          break;
        case 2:
          message.startDate = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.numberOfDays = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegistrationRequest_Offering {
    return {
      offeringId: isSet(object.offeringId) ? String(object.offeringId) : "",
      startDate: isSet(object.startDate)
        ? fromJsonTimestamp(object.startDate)
        : undefined,
      numberOfDays: isSet(object.numberOfDays)
        ? Number(object.numberOfDays)
        : 0,
    };
  },

  toJSON(message: RegistrationRequest_Offering): unknown {
    const obj: any = {};
    message.offeringId !== undefined && (obj.offeringId = message.offeringId);
    message.startDate !== undefined &&
      (obj.startDate = message.startDate.toISOString());
    message.numberOfDays !== undefined &&
      (obj.numberOfDays = Math.round(message.numberOfDays));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegistrationRequest_Offering>, I>>(
    object: I
  ): RegistrationRequest_Offering {
    const message = createBaseRegistrationRequest_Offering();
    message.offeringId = object.offeringId ?? "";
    message.startDate = object.startDate ?? undefined;
    message.numberOfDays = object.numberOfDays ?? 0;
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
