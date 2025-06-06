
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model TenantProfile
 * 
 */
export type TenantProfile = $Result.DefaultSelection<Prisma.$TenantProfilePayload>
/**
 * Model LandLordProfile
 * 
 */
export type LandLordProfile = $Result.DefaultSelection<Prisma.$LandLordProfilePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Preference: {
  calls: 'calls',
  chat: 'chat',
  both: 'both'
};

export type Preference = (typeof Preference)[keyof typeof Preference]

}

export type Preference = $Enums.Preference

export const Preference: typeof $Enums.Preference

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Roles
 * const roles = await prisma.role.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Roles
   * const roles = await prisma.role.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tenantProfile`: Exposes CRUD operations for the **TenantProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TenantProfiles
    * const tenantProfiles = await prisma.tenantProfile.findMany()
    * ```
    */
  get tenantProfile(): Prisma.TenantProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.landLordProfile`: Exposes CRUD operations for the **LandLordProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LandLordProfiles
    * const landLordProfiles = await prisma.landLordProfile.findMany()
    * ```
    */
  get landLordProfile(): Prisma.LandLordProfileDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Role: 'Role',
    User: 'User',
    TenantProfile: 'TenantProfile',
    LandLordProfile: 'LandLordProfile'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "role" | "user" | "tenantProfile" | "landLordProfile"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      TenantProfile: {
        payload: Prisma.$TenantProfilePayload<ExtArgs>
        fields: Prisma.TenantProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantProfilePayload>
          }
          findFirst: {
            args: Prisma.TenantProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantProfilePayload>
          }
          findMany: {
            args: Prisma.TenantProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantProfilePayload>[]
          }
          create: {
            args: Prisma.TenantProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantProfilePayload>
          }
          createMany: {
            args: Prisma.TenantProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantProfilePayload>[]
          }
          delete: {
            args: Prisma.TenantProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantProfilePayload>
          }
          update: {
            args: Prisma.TenantProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantProfilePayload>
          }
          deleteMany: {
            args: Prisma.TenantProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantProfilePayload>[]
          }
          upsert: {
            args: Prisma.TenantProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantProfilePayload>
          }
          aggregate: {
            args: Prisma.TenantProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenantProfile>
          }
          groupBy: {
            args: Prisma.TenantProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantProfileCountArgs<ExtArgs>
            result: $Utils.Optional<TenantProfileCountAggregateOutputType> | number
          }
        }
      }
      LandLordProfile: {
        payload: Prisma.$LandLordProfilePayload<ExtArgs>
        fields: Prisma.LandLordProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LandLordProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandLordProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LandLordProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandLordProfilePayload>
          }
          findFirst: {
            args: Prisma.LandLordProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandLordProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LandLordProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandLordProfilePayload>
          }
          findMany: {
            args: Prisma.LandLordProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandLordProfilePayload>[]
          }
          create: {
            args: Prisma.LandLordProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandLordProfilePayload>
          }
          createMany: {
            args: Prisma.LandLordProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LandLordProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandLordProfilePayload>[]
          }
          delete: {
            args: Prisma.LandLordProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandLordProfilePayload>
          }
          update: {
            args: Prisma.LandLordProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandLordProfilePayload>
          }
          deleteMany: {
            args: Prisma.LandLordProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LandLordProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LandLordProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandLordProfilePayload>[]
          }
          upsert: {
            args: Prisma.LandLordProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandLordProfilePayload>
          }
          aggregate: {
            args: Prisma.LandLordProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLandLordProfile>
          }
          groupBy: {
            args: Prisma.LandLordProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<LandLordProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.LandLordProfileCountArgs<ExtArgs>
            result: $Utils.Optional<LandLordProfileCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    role?: RoleOmit
    user?: UserOmit
    tenantProfile?: TenantProfileOmit
    landLordProfile?: LandLordProfileOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    users: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | RoleCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    tenants: number
    landlords: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenants?: boolean | UserCountOutputTypeCountTenantsArgs
    landlords?: boolean | UserCountOutputTypeCountLandlordsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTenantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantProfileWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLandlordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LandLordProfileWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleAvgAggregateOutputType = {
    id: number | null
  }

  export type RoleSumAggregateOutputType = {
    id: number | null
  }

  export type RoleMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type RoleMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type RoleAvgAggregateInputType = {
    id?: true
  }

  export type RoleSumAggregateInputType = {
    id?: true
  }

  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _avg?: RoleAvgAggregateInputType
    _sum?: RoleSumAggregateInputType
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: number
    name: string
    _count: RoleCountAggregateOutputType | null
    _avg: RoleAvgAggregateOutputType | null
    _sum: RoleSumAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    users?: boolean | Role$usersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Role$usersArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Role$usersArgs<ExtArgs> = {}>(args?: Subset<T, Role$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'Int'>
    readonly name: FieldRef<"Role", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.users
   */
  export type Role$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    roleId: number | null
  }

  export type UserSumAggregateOutputType = {
    roleId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    email: string | null
    phone: string | null
    password: string | null
    isVerified: boolean | null
    roleId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    email: string | null
    phone: string | null
    password: string | null
    isVerified: boolean | null
    roleId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fullName: number
    email: number
    phone: number
    password: number
    isVerified: number
    roleId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    roleId?: true
  }

  export type UserSumAggregateInputType = {
    roleId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    phone?: true
    password?: true
    isVerified?: true
    roleId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    phone?: true
    password?: true
    isVerified?: true
    roleId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    phone?: true
    password?: true
    isVerified?: true
    roleId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    fullName: string
    email: string
    phone: string
    password: string
    isVerified: boolean
    roleId: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    isVerified?: boolean
    roleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
    tenants?: boolean | User$tenantsArgs<ExtArgs>
    landlords?: boolean | User$landlordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    isVerified?: boolean
    roleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    isVerified?: boolean
    roleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    fullName?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    isVerified?: boolean
    roleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "email" | "phone" | "password" | "isVerified" | "roleId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
    tenants?: boolean | User$tenantsArgs<ExtArgs>
    landlords?: boolean | User$landlordsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | RoleDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      role: Prisma.$RolePayload<ExtArgs>
      tenants: Prisma.$TenantProfilePayload<ExtArgs>[]
      landlords: Prisma.$LandLordProfilePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      email: string
      phone: string
      password: string
      isVerified: boolean
      roleId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    role<T extends RoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoleDefaultArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tenants<T extends User$tenantsArgs<ExtArgs> = {}>(args?: Subset<T, User$tenantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    landlords<T extends User$landlordsArgs<ExtArgs> = {}>(args?: Subset<T, User$landlordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LandLordProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly roleId: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.tenants
   */
  export type User$tenantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileInclude<ExtArgs> | null
    where?: TenantProfileWhereInput
    orderBy?: TenantProfileOrderByWithRelationInput | TenantProfileOrderByWithRelationInput[]
    cursor?: TenantProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantProfileScalarFieldEnum | TenantProfileScalarFieldEnum[]
  }

  /**
   * User.landlords
   */
  export type User$landlordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileInclude<ExtArgs> | null
    where?: LandLordProfileWhereInput
    orderBy?: LandLordProfileOrderByWithRelationInput | LandLordProfileOrderByWithRelationInput[]
    cursor?: LandLordProfileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LandLordProfileScalarFieldEnum | LandLordProfileScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model TenantProfile
   */

  export type AggregateTenantProfile = {
    _count: TenantProfileCountAggregateOutputType | null
    _avg: TenantProfileAvgAggregateOutputType | null
    _sum: TenantProfileSumAggregateOutputType | null
    _min: TenantProfileMinAggregateOutputType | null
    _max: TenantProfileMaxAggregateOutputType | null
  }

  export type TenantProfileAvgAggregateOutputType = {
    id: number | null
  }

  export type TenantProfileSumAggregateOutputType = {
    id: number | null
  }

  export type TenantProfileMinAggregateOutputType = {
    id: number | null
    profileImage: string | null
    fullName: string | null
    phoneNumber: string | null
    street: string | null
    city: string | null
    state: string | null
    NIN: string | null
    userId: string | null
  }

  export type TenantProfileMaxAggregateOutputType = {
    id: number | null
    profileImage: string | null
    fullName: string | null
    phoneNumber: string | null
    street: string | null
    city: string | null
    state: string | null
    NIN: string | null
    userId: string | null
  }

  export type TenantProfileCountAggregateOutputType = {
    id: number
    profileImage: number
    fullName: number
    phoneNumber: number
    street: number
    city: number
    state: number
    NIN: number
    userId: number
    _all: number
  }


  export type TenantProfileAvgAggregateInputType = {
    id?: true
  }

  export type TenantProfileSumAggregateInputType = {
    id?: true
  }

  export type TenantProfileMinAggregateInputType = {
    id?: true
    profileImage?: true
    fullName?: true
    phoneNumber?: true
    street?: true
    city?: true
    state?: true
    NIN?: true
    userId?: true
  }

  export type TenantProfileMaxAggregateInputType = {
    id?: true
    profileImage?: true
    fullName?: true
    phoneNumber?: true
    street?: true
    city?: true
    state?: true
    NIN?: true
    userId?: true
  }

  export type TenantProfileCountAggregateInputType = {
    id?: true
    profileImage?: true
    fullName?: true
    phoneNumber?: true
    street?: true
    city?: true
    state?: true
    NIN?: true
    userId?: true
    _all?: true
  }

  export type TenantProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantProfile to aggregate.
     */
    where?: TenantProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantProfiles to fetch.
     */
    orderBy?: TenantProfileOrderByWithRelationInput | TenantProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TenantProfiles
    **/
    _count?: true | TenantProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TenantProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TenantProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantProfileMaxAggregateInputType
  }

  export type GetTenantProfileAggregateType<T extends TenantProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateTenantProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenantProfile[P]>
      : GetScalarType<T[P], AggregateTenantProfile[P]>
  }




  export type TenantProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantProfileWhereInput
    orderBy?: TenantProfileOrderByWithAggregationInput | TenantProfileOrderByWithAggregationInput[]
    by: TenantProfileScalarFieldEnum[] | TenantProfileScalarFieldEnum
    having?: TenantProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantProfileCountAggregateInputType | true
    _avg?: TenantProfileAvgAggregateInputType
    _sum?: TenantProfileSumAggregateInputType
    _min?: TenantProfileMinAggregateInputType
    _max?: TenantProfileMaxAggregateInputType
  }

  export type TenantProfileGroupByOutputType = {
    id: number
    profileImage: string
    fullName: string
    phoneNumber: string
    street: string
    city: string
    state: string
    NIN: string
    userId: string
    _count: TenantProfileCountAggregateOutputType | null
    _avg: TenantProfileAvgAggregateOutputType | null
    _sum: TenantProfileSumAggregateOutputType | null
    _min: TenantProfileMinAggregateOutputType | null
    _max: TenantProfileMaxAggregateOutputType | null
  }

  type GetTenantProfileGroupByPayload<T extends TenantProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantProfileGroupByOutputType[P]>
            : GetScalarType<T[P], TenantProfileGroupByOutputType[P]>
        }
      >
    >


  export type TenantProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileImage?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    NIN?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantProfile"]>

  export type TenantProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileImage?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    NIN?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantProfile"]>

  export type TenantProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileImage?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    NIN?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenantProfile"]>

  export type TenantProfileSelectScalar = {
    id?: boolean
    profileImage?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    street?: boolean
    city?: boolean
    state?: boolean
    NIN?: boolean
    userId?: boolean
  }

  export type TenantProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileImage" | "fullName" | "phoneNumber" | "street" | "city" | "state" | "NIN" | "userId", ExtArgs["result"]["tenantProfile"]>
  export type TenantProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TenantProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TenantProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TenantProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TenantProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      profileImage: string
      fullName: string
      phoneNumber: string
      street: string
      city: string
      state: string
      NIN: string
      userId: string
    }, ExtArgs["result"]["tenantProfile"]>
    composites: {}
  }

  type TenantProfileGetPayload<S extends boolean | null | undefined | TenantProfileDefaultArgs> = $Result.GetResult<Prisma.$TenantProfilePayload, S>

  type TenantProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantProfileCountAggregateInputType | true
    }

  export interface TenantProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TenantProfile'], meta: { name: 'TenantProfile' } }
    /**
     * Find zero or one TenantProfile that matches the filter.
     * @param {TenantProfileFindUniqueArgs} args - Arguments to find a TenantProfile
     * @example
     * // Get one TenantProfile
     * const tenantProfile = await prisma.tenantProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantProfileFindUniqueArgs>(args: SelectSubset<T, TenantProfileFindUniqueArgs<ExtArgs>>): Prisma__TenantProfileClient<$Result.GetResult<Prisma.$TenantProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TenantProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantProfileFindUniqueOrThrowArgs} args - Arguments to find a TenantProfile
     * @example
     * // Get one TenantProfile
     * const tenantProfile = await prisma.tenantProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantProfileClient<$Result.GetResult<Prisma.$TenantProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TenantProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantProfileFindFirstArgs} args - Arguments to find a TenantProfile
     * @example
     * // Get one TenantProfile
     * const tenantProfile = await prisma.tenantProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantProfileFindFirstArgs>(args?: SelectSubset<T, TenantProfileFindFirstArgs<ExtArgs>>): Prisma__TenantProfileClient<$Result.GetResult<Prisma.$TenantProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TenantProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantProfileFindFirstOrThrowArgs} args - Arguments to find a TenantProfile
     * @example
     * // Get one TenantProfile
     * const tenantProfile = await prisma.tenantProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantProfileClient<$Result.GetResult<Prisma.$TenantProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TenantProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TenantProfiles
     * const tenantProfiles = await prisma.tenantProfile.findMany()
     * 
     * // Get first 10 TenantProfiles
     * const tenantProfiles = await prisma.tenantProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantProfileWithIdOnly = await prisma.tenantProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantProfileFindManyArgs>(args?: SelectSubset<T, TenantProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TenantProfile.
     * @param {TenantProfileCreateArgs} args - Arguments to create a TenantProfile.
     * @example
     * // Create one TenantProfile
     * const TenantProfile = await prisma.tenantProfile.create({
     *   data: {
     *     // ... data to create a TenantProfile
     *   }
     * })
     * 
     */
    create<T extends TenantProfileCreateArgs>(args: SelectSubset<T, TenantProfileCreateArgs<ExtArgs>>): Prisma__TenantProfileClient<$Result.GetResult<Prisma.$TenantProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TenantProfiles.
     * @param {TenantProfileCreateManyArgs} args - Arguments to create many TenantProfiles.
     * @example
     * // Create many TenantProfiles
     * const tenantProfile = await prisma.tenantProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantProfileCreateManyArgs>(args?: SelectSubset<T, TenantProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TenantProfiles and returns the data saved in the database.
     * @param {TenantProfileCreateManyAndReturnArgs} args - Arguments to create many TenantProfiles.
     * @example
     * // Create many TenantProfiles
     * const tenantProfile = await prisma.tenantProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TenantProfiles and only return the `id`
     * const tenantProfileWithIdOnly = await prisma.tenantProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TenantProfile.
     * @param {TenantProfileDeleteArgs} args - Arguments to delete one TenantProfile.
     * @example
     * // Delete one TenantProfile
     * const TenantProfile = await prisma.tenantProfile.delete({
     *   where: {
     *     // ... filter to delete one TenantProfile
     *   }
     * })
     * 
     */
    delete<T extends TenantProfileDeleteArgs>(args: SelectSubset<T, TenantProfileDeleteArgs<ExtArgs>>): Prisma__TenantProfileClient<$Result.GetResult<Prisma.$TenantProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TenantProfile.
     * @param {TenantProfileUpdateArgs} args - Arguments to update one TenantProfile.
     * @example
     * // Update one TenantProfile
     * const tenantProfile = await prisma.tenantProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantProfileUpdateArgs>(args: SelectSubset<T, TenantProfileUpdateArgs<ExtArgs>>): Prisma__TenantProfileClient<$Result.GetResult<Prisma.$TenantProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TenantProfiles.
     * @param {TenantProfileDeleteManyArgs} args - Arguments to filter TenantProfiles to delete.
     * @example
     * // Delete a few TenantProfiles
     * const { count } = await prisma.tenantProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantProfileDeleteManyArgs>(args?: SelectSubset<T, TenantProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TenantProfiles
     * const tenantProfile = await prisma.tenantProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantProfileUpdateManyArgs>(args: SelectSubset<T, TenantProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TenantProfiles and returns the data updated in the database.
     * @param {TenantProfileUpdateManyAndReturnArgs} args - Arguments to update many TenantProfiles.
     * @example
     * // Update many TenantProfiles
     * const tenantProfile = await prisma.tenantProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TenantProfiles and only return the `id`
     * const tenantProfileWithIdOnly = await prisma.tenantProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TenantProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TenantProfile.
     * @param {TenantProfileUpsertArgs} args - Arguments to update or create a TenantProfile.
     * @example
     * // Update or create a TenantProfile
     * const tenantProfile = await prisma.tenantProfile.upsert({
     *   create: {
     *     // ... data to create a TenantProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TenantProfile we want to update
     *   }
     * })
     */
    upsert<T extends TenantProfileUpsertArgs>(args: SelectSubset<T, TenantProfileUpsertArgs<ExtArgs>>): Prisma__TenantProfileClient<$Result.GetResult<Prisma.$TenantProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TenantProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantProfileCountArgs} args - Arguments to filter TenantProfiles to count.
     * @example
     * // Count the number of TenantProfiles
     * const count = await prisma.tenantProfile.count({
     *   where: {
     *     // ... the filter for the TenantProfiles we want to count
     *   }
     * })
    **/
    count<T extends TenantProfileCountArgs>(
      args?: Subset<T, TenantProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TenantProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantProfileAggregateArgs>(args: Subset<T, TenantProfileAggregateArgs>): Prisma.PrismaPromise<GetTenantProfileAggregateType<T>>

    /**
     * Group by TenantProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantProfileGroupByArgs['orderBy'] }
        : { orderBy?: TenantProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TenantProfile model
   */
  readonly fields: TenantProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TenantProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TenantProfile model
   */
  interface TenantProfileFieldRefs {
    readonly id: FieldRef<"TenantProfile", 'Int'>
    readonly profileImage: FieldRef<"TenantProfile", 'String'>
    readonly fullName: FieldRef<"TenantProfile", 'String'>
    readonly phoneNumber: FieldRef<"TenantProfile", 'String'>
    readonly street: FieldRef<"TenantProfile", 'String'>
    readonly city: FieldRef<"TenantProfile", 'String'>
    readonly state: FieldRef<"TenantProfile", 'String'>
    readonly NIN: FieldRef<"TenantProfile", 'String'>
    readonly userId: FieldRef<"TenantProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TenantProfile findUnique
   */
  export type TenantProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileInclude<ExtArgs> | null
    /**
     * Filter, which TenantProfile to fetch.
     */
    where: TenantProfileWhereUniqueInput
  }

  /**
   * TenantProfile findUniqueOrThrow
   */
  export type TenantProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileInclude<ExtArgs> | null
    /**
     * Filter, which TenantProfile to fetch.
     */
    where: TenantProfileWhereUniqueInput
  }

  /**
   * TenantProfile findFirst
   */
  export type TenantProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileInclude<ExtArgs> | null
    /**
     * Filter, which TenantProfile to fetch.
     */
    where?: TenantProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantProfiles to fetch.
     */
    orderBy?: TenantProfileOrderByWithRelationInput | TenantProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantProfiles.
     */
    cursor?: TenantProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantProfiles.
     */
    distinct?: TenantProfileScalarFieldEnum | TenantProfileScalarFieldEnum[]
  }

  /**
   * TenantProfile findFirstOrThrow
   */
  export type TenantProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileInclude<ExtArgs> | null
    /**
     * Filter, which TenantProfile to fetch.
     */
    where?: TenantProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantProfiles to fetch.
     */
    orderBy?: TenantProfileOrderByWithRelationInput | TenantProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TenantProfiles.
     */
    cursor?: TenantProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TenantProfiles.
     */
    distinct?: TenantProfileScalarFieldEnum | TenantProfileScalarFieldEnum[]
  }

  /**
   * TenantProfile findMany
   */
  export type TenantProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileInclude<ExtArgs> | null
    /**
     * Filter, which TenantProfiles to fetch.
     */
    where?: TenantProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TenantProfiles to fetch.
     */
    orderBy?: TenantProfileOrderByWithRelationInput | TenantProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TenantProfiles.
     */
    cursor?: TenantProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TenantProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TenantProfiles.
     */
    skip?: number
    distinct?: TenantProfileScalarFieldEnum | TenantProfileScalarFieldEnum[]
  }

  /**
   * TenantProfile create
   */
  export type TenantProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a TenantProfile.
     */
    data: XOR<TenantProfileCreateInput, TenantProfileUncheckedCreateInput>
  }

  /**
   * TenantProfile createMany
   */
  export type TenantProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TenantProfiles.
     */
    data: TenantProfileCreateManyInput | TenantProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TenantProfile createManyAndReturn
   */
  export type TenantProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * The data used to create many TenantProfiles.
     */
    data: TenantProfileCreateManyInput | TenantProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TenantProfile update
   */
  export type TenantProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a TenantProfile.
     */
    data: XOR<TenantProfileUpdateInput, TenantProfileUncheckedUpdateInput>
    /**
     * Choose, which TenantProfile to update.
     */
    where: TenantProfileWhereUniqueInput
  }

  /**
   * TenantProfile updateMany
   */
  export type TenantProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TenantProfiles.
     */
    data: XOR<TenantProfileUpdateManyMutationInput, TenantProfileUncheckedUpdateManyInput>
    /**
     * Filter which TenantProfiles to update
     */
    where?: TenantProfileWhereInput
    /**
     * Limit how many TenantProfiles to update.
     */
    limit?: number
  }

  /**
   * TenantProfile updateManyAndReturn
   */
  export type TenantProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * The data used to update TenantProfiles.
     */
    data: XOR<TenantProfileUpdateManyMutationInput, TenantProfileUncheckedUpdateManyInput>
    /**
     * Filter which TenantProfiles to update
     */
    where?: TenantProfileWhereInput
    /**
     * Limit how many TenantProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TenantProfile upsert
   */
  export type TenantProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the TenantProfile to update in case it exists.
     */
    where: TenantProfileWhereUniqueInput
    /**
     * In case the TenantProfile found by the `where` argument doesn't exist, create a new TenantProfile with this data.
     */
    create: XOR<TenantProfileCreateInput, TenantProfileUncheckedCreateInput>
    /**
     * In case the TenantProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantProfileUpdateInput, TenantProfileUncheckedUpdateInput>
  }

  /**
   * TenantProfile delete
   */
  export type TenantProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileInclude<ExtArgs> | null
    /**
     * Filter which TenantProfile to delete.
     */
    where: TenantProfileWhereUniqueInput
  }

  /**
   * TenantProfile deleteMany
   */
  export type TenantProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TenantProfiles to delete
     */
    where?: TenantProfileWhereInput
    /**
     * Limit how many TenantProfiles to delete.
     */
    limit?: number
  }

  /**
   * TenantProfile without action
   */
  export type TenantProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantProfile
     */
    select?: TenantProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TenantProfile
     */
    omit?: TenantProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantProfileInclude<ExtArgs> | null
  }


  /**
   * Model LandLordProfile
   */

  export type AggregateLandLordProfile = {
    _count: LandLordProfileCountAggregateOutputType | null
    _avg: LandLordProfileAvgAggregateOutputType | null
    _sum: LandLordProfileSumAggregateOutputType | null
    _min: LandLordProfileMinAggregateOutputType | null
    _max: LandLordProfileMaxAggregateOutputType | null
  }

  export type LandLordProfileAvgAggregateOutputType = {
    id: number | null
  }

  export type LandLordProfileSumAggregateOutputType = {
    id: number | null
  }

  export type LandLordProfileMinAggregateOutputType = {
    id: number | null
    profileImage: string | null
    typeOfHouse: string | null
    numberOfRooms: string | null
    otherInfo: string | null
    street: string | null
    preference: $Enums.Preference | null
    userId: string | null
  }

  export type LandLordProfileMaxAggregateOutputType = {
    id: number | null
    profileImage: string | null
    typeOfHouse: string | null
    numberOfRooms: string | null
    otherInfo: string | null
    street: string | null
    preference: $Enums.Preference | null
    userId: string | null
  }

  export type LandLordProfileCountAggregateOutputType = {
    id: number
    profileImage: number
    typeOfHouse: number
    numberOfRooms: number
    otherInfo: number
    street: number
    preference: number
    userId: number
    _all: number
  }


  export type LandLordProfileAvgAggregateInputType = {
    id?: true
  }

  export type LandLordProfileSumAggregateInputType = {
    id?: true
  }

  export type LandLordProfileMinAggregateInputType = {
    id?: true
    profileImage?: true
    typeOfHouse?: true
    numberOfRooms?: true
    otherInfo?: true
    street?: true
    preference?: true
    userId?: true
  }

  export type LandLordProfileMaxAggregateInputType = {
    id?: true
    profileImage?: true
    typeOfHouse?: true
    numberOfRooms?: true
    otherInfo?: true
    street?: true
    preference?: true
    userId?: true
  }

  export type LandLordProfileCountAggregateInputType = {
    id?: true
    profileImage?: true
    typeOfHouse?: true
    numberOfRooms?: true
    otherInfo?: true
    street?: true
    preference?: true
    userId?: true
    _all?: true
  }

  export type LandLordProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LandLordProfile to aggregate.
     */
    where?: LandLordProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LandLordProfiles to fetch.
     */
    orderBy?: LandLordProfileOrderByWithRelationInput | LandLordProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LandLordProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LandLordProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LandLordProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LandLordProfiles
    **/
    _count?: true | LandLordProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LandLordProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LandLordProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LandLordProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LandLordProfileMaxAggregateInputType
  }

  export type GetLandLordProfileAggregateType<T extends LandLordProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateLandLordProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLandLordProfile[P]>
      : GetScalarType<T[P], AggregateLandLordProfile[P]>
  }




  export type LandLordProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LandLordProfileWhereInput
    orderBy?: LandLordProfileOrderByWithAggregationInput | LandLordProfileOrderByWithAggregationInput[]
    by: LandLordProfileScalarFieldEnum[] | LandLordProfileScalarFieldEnum
    having?: LandLordProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LandLordProfileCountAggregateInputType | true
    _avg?: LandLordProfileAvgAggregateInputType
    _sum?: LandLordProfileSumAggregateInputType
    _min?: LandLordProfileMinAggregateInputType
    _max?: LandLordProfileMaxAggregateInputType
  }

  export type LandLordProfileGroupByOutputType = {
    id: number
    profileImage: string
    typeOfHouse: string
    numberOfRooms: string
    otherInfo: string
    street: string
    preference: $Enums.Preference
    userId: string
    _count: LandLordProfileCountAggregateOutputType | null
    _avg: LandLordProfileAvgAggregateOutputType | null
    _sum: LandLordProfileSumAggregateOutputType | null
    _min: LandLordProfileMinAggregateOutputType | null
    _max: LandLordProfileMaxAggregateOutputType | null
  }

  type GetLandLordProfileGroupByPayload<T extends LandLordProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LandLordProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LandLordProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LandLordProfileGroupByOutputType[P]>
            : GetScalarType<T[P], LandLordProfileGroupByOutputType[P]>
        }
      >
    >


  export type LandLordProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileImage?: boolean
    typeOfHouse?: boolean
    numberOfRooms?: boolean
    otherInfo?: boolean
    street?: boolean
    preference?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["landLordProfile"]>

  export type LandLordProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileImage?: boolean
    typeOfHouse?: boolean
    numberOfRooms?: boolean
    otherInfo?: boolean
    street?: boolean
    preference?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["landLordProfile"]>

  export type LandLordProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileImage?: boolean
    typeOfHouse?: boolean
    numberOfRooms?: boolean
    otherInfo?: boolean
    street?: boolean
    preference?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["landLordProfile"]>

  export type LandLordProfileSelectScalar = {
    id?: boolean
    profileImage?: boolean
    typeOfHouse?: boolean
    numberOfRooms?: boolean
    otherInfo?: boolean
    street?: boolean
    preference?: boolean
    userId?: boolean
  }

  export type LandLordProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileImage" | "typeOfHouse" | "numberOfRooms" | "otherInfo" | "street" | "preference" | "userId", ExtArgs["result"]["landLordProfile"]>
  export type LandLordProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LandLordProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type LandLordProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $LandLordProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LandLordProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      profileImage: string
      typeOfHouse: string
      numberOfRooms: string
      otherInfo: string
      street: string
      preference: $Enums.Preference
      userId: string
    }, ExtArgs["result"]["landLordProfile"]>
    composites: {}
  }

  type LandLordProfileGetPayload<S extends boolean | null | undefined | LandLordProfileDefaultArgs> = $Result.GetResult<Prisma.$LandLordProfilePayload, S>

  type LandLordProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LandLordProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LandLordProfileCountAggregateInputType | true
    }

  export interface LandLordProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LandLordProfile'], meta: { name: 'LandLordProfile' } }
    /**
     * Find zero or one LandLordProfile that matches the filter.
     * @param {LandLordProfileFindUniqueArgs} args - Arguments to find a LandLordProfile
     * @example
     * // Get one LandLordProfile
     * const landLordProfile = await prisma.landLordProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LandLordProfileFindUniqueArgs>(args: SelectSubset<T, LandLordProfileFindUniqueArgs<ExtArgs>>): Prisma__LandLordProfileClient<$Result.GetResult<Prisma.$LandLordProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LandLordProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LandLordProfileFindUniqueOrThrowArgs} args - Arguments to find a LandLordProfile
     * @example
     * // Get one LandLordProfile
     * const landLordProfile = await prisma.landLordProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LandLordProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, LandLordProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LandLordProfileClient<$Result.GetResult<Prisma.$LandLordProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LandLordProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandLordProfileFindFirstArgs} args - Arguments to find a LandLordProfile
     * @example
     * // Get one LandLordProfile
     * const landLordProfile = await prisma.landLordProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LandLordProfileFindFirstArgs>(args?: SelectSubset<T, LandLordProfileFindFirstArgs<ExtArgs>>): Prisma__LandLordProfileClient<$Result.GetResult<Prisma.$LandLordProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LandLordProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandLordProfileFindFirstOrThrowArgs} args - Arguments to find a LandLordProfile
     * @example
     * // Get one LandLordProfile
     * const landLordProfile = await prisma.landLordProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LandLordProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, LandLordProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__LandLordProfileClient<$Result.GetResult<Prisma.$LandLordProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LandLordProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandLordProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LandLordProfiles
     * const landLordProfiles = await prisma.landLordProfile.findMany()
     * 
     * // Get first 10 LandLordProfiles
     * const landLordProfiles = await prisma.landLordProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const landLordProfileWithIdOnly = await prisma.landLordProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LandLordProfileFindManyArgs>(args?: SelectSubset<T, LandLordProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LandLordProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LandLordProfile.
     * @param {LandLordProfileCreateArgs} args - Arguments to create a LandLordProfile.
     * @example
     * // Create one LandLordProfile
     * const LandLordProfile = await prisma.landLordProfile.create({
     *   data: {
     *     // ... data to create a LandLordProfile
     *   }
     * })
     * 
     */
    create<T extends LandLordProfileCreateArgs>(args: SelectSubset<T, LandLordProfileCreateArgs<ExtArgs>>): Prisma__LandLordProfileClient<$Result.GetResult<Prisma.$LandLordProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LandLordProfiles.
     * @param {LandLordProfileCreateManyArgs} args - Arguments to create many LandLordProfiles.
     * @example
     * // Create many LandLordProfiles
     * const landLordProfile = await prisma.landLordProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LandLordProfileCreateManyArgs>(args?: SelectSubset<T, LandLordProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LandLordProfiles and returns the data saved in the database.
     * @param {LandLordProfileCreateManyAndReturnArgs} args - Arguments to create many LandLordProfiles.
     * @example
     * // Create many LandLordProfiles
     * const landLordProfile = await prisma.landLordProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LandLordProfiles and only return the `id`
     * const landLordProfileWithIdOnly = await prisma.landLordProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LandLordProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, LandLordProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LandLordProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LandLordProfile.
     * @param {LandLordProfileDeleteArgs} args - Arguments to delete one LandLordProfile.
     * @example
     * // Delete one LandLordProfile
     * const LandLordProfile = await prisma.landLordProfile.delete({
     *   where: {
     *     // ... filter to delete one LandLordProfile
     *   }
     * })
     * 
     */
    delete<T extends LandLordProfileDeleteArgs>(args: SelectSubset<T, LandLordProfileDeleteArgs<ExtArgs>>): Prisma__LandLordProfileClient<$Result.GetResult<Prisma.$LandLordProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LandLordProfile.
     * @param {LandLordProfileUpdateArgs} args - Arguments to update one LandLordProfile.
     * @example
     * // Update one LandLordProfile
     * const landLordProfile = await prisma.landLordProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LandLordProfileUpdateArgs>(args: SelectSubset<T, LandLordProfileUpdateArgs<ExtArgs>>): Prisma__LandLordProfileClient<$Result.GetResult<Prisma.$LandLordProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LandLordProfiles.
     * @param {LandLordProfileDeleteManyArgs} args - Arguments to filter LandLordProfiles to delete.
     * @example
     * // Delete a few LandLordProfiles
     * const { count } = await prisma.landLordProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LandLordProfileDeleteManyArgs>(args?: SelectSubset<T, LandLordProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LandLordProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandLordProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LandLordProfiles
     * const landLordProfile = await prisma.landLordProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LandLordProfileUpdateManyArgs>(args: SelectSubset<T, LandLordProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LandLordProfiles and returns the data updated in the database.
     * @param {LandLordProfileUpdateManyAndReturnArgs} args - Arguments to update many LandLordProfiles.
     * @example
     * // Update many LandLordProfiles
     * const landLordProfile = await prisma.landLordProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LandLordProfiles and only return the `id`
     * const landLordProfileWithIdOnly = await prisma.landLordProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LandLordProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, LandLordProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LandLordProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LandLordProfile.
     * @param {LandLordProfileUpsertArgs} args - Arguments to update or create a LandLordProfile.
     * @example
     * // Update or create a LandLordProfile
     * const landLordProfile = await prisma.landLordProfile.upsert({
     *   create: {
     *     // ... data to create a LandLordProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LandLordProfile we want to update
     *   }
     * })
     */
    upsert<T extends LandLordProfileUpsertArgs>(args: SelectSubset<T, LandLordProfileUpsertArgs<ExtArgs>>): Prisma__LandLordProfileClient<$Result.GetResult<Prisma.$LandLordProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LandLordProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandLordProfileCountArgs} args - Arguments to filter LandLordProfiles to count.
     * @example
     * // Count the number of LandLordProfiles
     * const count = await prisma.landLordProfile.count({
     *   where: {
     *     // ... the filter for the LandLordProfiles we want to count
     *   }
     * })
    **/
    count<T extends LandLordProfileCountArgs>(
      args?: Subset<T, LandLordProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LandLordProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LandLordProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandLordProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LandLordProfileAggregateArgs>(args: Subset<T, LandLordProfileAggregateArgs>): Prisma.PrismaPromise<GetLandLordProfileAggregateType<T>>

    /**
     * Group by LandLordProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandLordProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LandLordProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LandLordProfileGroupByArgs['orderBy'] }
        : { orderBy?: LandLordProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LandLordProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLandLordProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LandLordProfile model
   */
  readonly fields: LandLordProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LandLordProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LandLordProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LandLordProfile model
   */
  interface LandLordProfileFieldRefs {
    readonly id: FieldRef<"LandLordProfile", 'Int'>
    readonly profileImage: FieldRef<"LandLordProfile", 'String'>
    readonly typeOfHouse: FieldRef<"LandLordProfile", 'String'>
    readonly numberOfRooms: FieldRef<"LandLordProfile", 'String'>
    readonly otherInfo: FieldRef<"LandLordProfile", 'String'>
    readonly street: FieldRef<"LandLordProfile", 'String'>
    readonly preference: FieldRef<"LandLordProfile", 'Preference'>
    readonly userId: FieldRef<"LandLordProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * LandLordProfile findUnique
   */
  export type LandLordProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileInclude<ExtArgs> | null
    /**
     * Filter, which LandLordProfile to fetch.
     */
    where: LandLordProfileWhereUniqueInput
  }

  /**
   * LandLordProfile findUniqueOrThrow
   */
  export type LandLordProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileInclude<ExtArgs> | null
    /**
     * Filter, which LandLordProfile to fetch.
     */
    where: LandLordProfileWhereUniqueInput
  }

  /**
   * LandLordProfile findFirst
   */
  export type LandLordProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileInclude<ExtArgs> | null
    /**
     * Filter, which LandLordProfile to fetch.
     */
    where?: LandLordProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LandLordProfiles to fetch.
     */
    orderBy?: LandLordProfileOrderByWithRelationInput | LandLordProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LandLordProfiles.
     */
    cursor?: LandLordProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LandLordProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LandLordProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LandLordProfiles.
     */
    distinct?: LandLordProfileScalarFieldEnum | LandLordProfileScalarFieldEnum[]
  }

  /**
   * LandLordProfile findFirstOrThrow
   */
  export type LandLordProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileInclude<ExtArgs> | null
    /**
     * Filter, which LandLordProfile to fetch.
     */
    where?: LandLordProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LandLordProfiles to fetch.
     */
    orderBy?: LandLordProfileOrderByWithRelationInput | LandLordProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LandLordProfiles.
     */
    cursor?: LandLordProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LandLordProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LandLordProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LandLordProfiles.
     */
    distinct?: LandLordProfileScalarFieldEnum | LandLordProfileScalarFieldEnum[]
  }

  /**
   * LandLordProfile findMany
   */
  export type LandLordProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileInclude<ExtArgs> | null
    /**
     * Filter, which LandLordProfiles to fetch.
     */
    where?: LandLordProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LandLordProfiles to fetch.
     */
    orderBy?: LandLordProfileOrderByWithRelationInput | LandLordProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LandLordProfiles.
     */
    cursor?: LandLordProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LandLordProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LandLordProfiles.
     */
    skip?: number
    distinct?: LandLordProfileScalarFieldEnum | LandLordProfileScalarFieldEnum[]
  }

  /**
   * LandLordProfile create
   */
  export type LandLordProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a LandLordProfile.
     */
    data: XOR<LandLordProfileCreateInput, LandLordProfileUncheckedCreateInput>
  }

  /**
   * LandLordProfile createMany
   */
  export type LandLordProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LandLordProfiles.
     */
    data: LandLordProfileCreateManyInput | LandLordProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LandLordProfile createManyAndReturn
   */
  export type LandLordProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * The data used to create many LandLordProfiles.
     */
    data: LandLordProfileCreateManyInput | LandLordProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LandLordProfile update
   */
  export type LandLordProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a LandLordProfile.
     */
    data: XOR<LandLordProfileUpdateInput, LandLordProfileUncheckedUpdateInput>
    /**
     * Choose, which LandLordProfile to update.
     */
    where: LandLordProfileWhereUniqueInput
  }

  /**
   * LandLordProfile updateMany
   */
  export type LandLordProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LandLordProfiles.
     */
    data: XOR<LandLordProfileUpdateManyMutationInput, LandLordProfileUncheckedUpdateManyInput>
    /**
     * Filter which LandLordProfiles to update
     */
    where?: LandLordProfileWhereInput
    /**
     * Limit how many LandLordProfiles to update.
     */
    limit?: number
  }

  /**
   * LandLordProfile updateManyAndReturn
   */
  export type LandLordProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * The data used to update LandLordProfiles.
     */
    data: XOR<LandLordProfileUpdateManyMutationInput, LandLordProfileUncheckedUpdateManyInput>
    /**
     * Filter which LandLordProfiles to update
     */
    where?: LandLordProfileWhereInput
    /**
     * Limit how many LandLordProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LandLordProfile upsert
   */
  export type LandLordProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the LandLordProfile to update in case it exists.
     */
    where: LandLordProfileWhereUniqueInput
    /**
     * In case the LandLordProfile found by the `where` argument doesn't exist, create a new LandLordProfile with this data.
     */
    create: XOR<LandLordProfileCreateInput, LandLordProfileUncheckedCreateInput>
    /**
     * In case the LandLordProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LandLordProfileUpdateInput, LandLordProfileUncheckedUpdateInput>
  }

  /**
   * LandLordProfile delete
   */
  export type LandLordProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileInclude<ExtArgs> | null
    /**
     * Filter which LandLordProfile to delete.
     */
    where: LandLordProfileWhereUniqueInput
  }

  /**
   * LandLordProfile deleteMany
   */
  export type LandLordProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LandLordProfiles to delete
     */
    where?: LandLordProfileWhereInput
    /**
     * Limit how many LandLordProfiles to delete.
     */
    limit?: number
  }

  /**
   * LandLordProfile without action
   */
  export type LandLordProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandLordProfile
     */
    select?: LandLordProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LandLordProfile
     */
    omit?: LandLordProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandLordProfileInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    phone: 'phone',
    password: 'password',
    isVerified: 'isVerified',
    roleId: 'roleId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TenantProfileScalarFieldEnum: {
    id: 'id',
    profileImage: 'profileImage',
    fullName: 'fullName',
    phoneNumber: 'phoneNumber',
    street: 'street',
    city: 'city',
    state: 'state',
    NIN: 'NIN',
    userId: 'userId'
  };

  export type TenantProfileScalarFieldEnum = (typeof TenantProfileScalarFieldEnum)[keyof typeof TenantProfileScalarFieldEnum]


  export const LandLordProfileScalarFieldEnum: {
    id: 'id',
    profileImage: 'profileImage',
    typeOfHouse: 'typeOfHouse',
    numberOfRooms: 'numberOfRooms',
    otherInfo: 'otherInfo',
    street: 'street',
    preference: 'preference',
    userId: 'userId'
  };

  export type LandLordProfileScalarFieldEnum = (typeof LandLordProfileScalarFieldEnum)[keyof typeof LandLordProfileScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Preference'
   */
  export type EnumPreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Preference'>
    


  /**
   * Reference to a field of type 'Preference[]'
   */
  export type ListEnumPreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Preference[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: IntFilter<"Role"> | number
    name?: StringFilter<"Role"> | string
    users?: UserListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    users?: UserListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _avg?: RoleAvgOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
    _sum?: RoleSumOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Role"> | number
    name?: StringWithAggregatesFilter<"Role"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    isVerified?: BoolFilter<"User"> | boolean
    roleId?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    tenants?: TenantProfileListRelationFilter
    landlords?: LandLordProfileListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    isVerified?: SortOrder
    roleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: RoleOrderByWithRelationInput
    tenants?: TenantProfileOrderByRelationAggregateInput
    landlords?: LandLordProfileOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    isVerified?: BoolFilter<"User"> | boolean
    roleId?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: XOR<RoleScalarRelationFilter, RoleWhereInput>
    tenants?: TenantProfileListRelationFilter
    landlords?: LandLordProfileListRelationFilter
  }, "id" | "email" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    isVerified?: SortOrder
    roleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    roleId?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TenantProfileWhereInput = {
    AND?: TenantProfileWhereInput | TenantProfileWhereInput[]
    OR?: TenantProfileWhereInput[]
    NOT?: TenantProfileWhereInput | TenantProfileWhereInput[]
    id?: IntFilter<"TenantProfile"> | number
    profileImage?: StringFilter<"TenantProfile"> | string
    fullName?: StringFilter<"TenantProfile"> | string
    phoneNumber?: StringFilter<"TenantProfile"> | string
    street?: StringFilter<"TenantProfile"> | string
    city?: StringFilter<"TenantProfile"> | string
    state?: StringFilter<"TenantProfile"> | string
    NIN?: StringFilter<"TenantProfile"> | string
    userId?: StringFilter<"TenantProfile"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TenantProfileOrderByWithRelationInput = {
    id?: SortOrder
    profileImage?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    NIN?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TenantProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    phoneNumber?: string
    NIN?: string
    AND?: TenantProfileWhereInput | TenantProfileWhereInput[]
    OR?: TenantProfileWhereInput[]
    NOT?: TenantProfileWhereInput | TenantProfileWhereInput[]
    profileImage?: StringFilter<"TenantProfile"> | string
    fullName?: StringFilter<"TenantProfile"> | string
    street?: StringFilter<"TenantProfile"> | string
    city?: StringFilter<"TenantProfile"> | string
    state?: StringFilter<"TenantProfile"> | string
    userId?: StringFilter<"TenantProfile"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "phoneNumber" | "NIN">

  export type TenantProfileOrderByWithAggregationInput = {
    id?: SortOrder
    profileImage?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    NIN?: SortOrder
    userId?: SortOrder
    _count?: TenantProfileCountOrderByAggregateInput
    _avg?: TenantProfileAvgOrderByAggregateInput
    _max?: TenantProfileMaxOrderByAggregateInput
    _min?: TenantProfileMinOrderByAggregateInput
    _sum?: TenantProfileSumOrderByAggregateInput
  }

  export type TenantProfileScalarWhereWithAggregatesInput = {
    AND?: TenantProfileScalarWhereWithAggregatesInput | TenantProfileScalarWhereWithAggregatesInput[]
    OR?: TenantProfileScalarWhereWithAggregatesInput[]
    NOT?: TenantProfileScalarWhereWithAggregatesInput | TenantProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TenantProfile"> | number
    profileImage?: StringWithAggregatesFilter<"TenantProfile"> | string
    fullName?: StringWithAggregatesFilter<"TenantProfile"> | string
    phoneNumber?: StringWithAggregatesFilter<"TenantProfile"> | string
    street?: StringWithAggregatesFilter<"TenantProfile"> | string
    city?: StringWithAggregatesFilter<"TenantProfile"> | string
    state?: StringWithAggregatesFilter<"TenantProfile"> | string
    NIN?: StringWithAggregatesFilter<"TenantProfile"> | string
    userId?: StringWithAggregatesFilter<"TenantProfile"> | string
  }

  export type LandLordProfileWhereInput = {
    AND?: LandLordProfileWhereInput | LandLordProfileWhereInput[]
    OR?: LandLordProfileWhereInput[]
    NOT?: LandLordProfileWhereInput | LandLordProfileWhereInput[]
    id?: IntFilter<"LandLordProfile"> | number
    profileImage?: StringFilter<"LandLordProfile"> | string
    typeOfHouse?: StringFilter<"LandLordProfile"> | string
    numberOfRooms?: StringFilter<"LandLordProfile"> | string
    otherInfo?: StringFilter<"LandLordProfile"> | string
    street?: StringFilter<"LandLordProfile"> | string
    preference?: EnumPreferenceFilter<"LandLordProfile"> | $Enums.Preference
    userId?: StringFilter<"LandLordProfile"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type LandLordProfileOrderByWithRelationInput = {
    id?: SortOrder
    profileImage?: SortOrder
    typeOfHouse?: SortOrder
    numberOfRooms?: SortOrder
    otherInfo?: SortOrder
    street?: SortOrder
    preference?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type LandLordProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LandLordProfileWhereInput | LandLordProfileWhereInput[]
    OR?: LandLordProfileWhereInput[]
    NOT?: LandLordProfileWhereInput | LandLordProfileWhereInput[]
    profileImage?: StringFilter<"LandLordProfile"> | string
    typeOfHouse?: StringFilter<"LandLordProfile"> | string
    numberOfRooms?: StringFilter<"LandLordProfile"> | string
    otherInfo?: StringFilter<"LandLordProfile"> | string
    street?: StringFilter<"LandLordProfile"> | string
    preference?: EnumPreferenceFilter<"LandLordProfile"> | $Enums.Preference
    userId?: StringFilter<"LandLordProfile"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type LandLordProfileOrderByWithAggregationInput = {
    id?: SortOrder
    profileImage?: SortOrder
    typeOfHouse?: SortOrder
    numberOfRooms?: SortOrder
    otherInfo?: SortOrder
    street?: SortOrder
    preference?: SortOrder
    userId?: SortOrder
    _count?: LandLordProfileCountOrderByAggregateInput
    _avg?: LandLordProfileAvgOrderByAggregateInput
    _max?: LandLordProfileMaxOrderByAggregateInput
    _min?: LandLordProfileMinOrderByAggregateInput
    _sum?: LandLordProfileSumOrderByAggregateInput
  }

  export type LandLordProfileScalarWhereWithAggregatesInput = {
    AND?: LandLordProfileScalarWhereWithAggregatesInput | LandLordProfileScalarWhereWithAggregatesInput[]
    OR?: LandLordProfileScalarWhereWithAggregatesInput[]
    NOT?: LandLordProfileScalarWhereWithAggregatesInput | LandLordProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LandLordProfile"> | number
    profileImage?: StringWithAggregatesFilter<"LandLordProfile"> | string
    typeOfHouse?: StringWithAggregatesFilter<"LandLordProfile"> | string
    numberOfRooms?: StringWithAggregatesFilter<"LandLordProfile"> | string
    otherInfo?: StringWithAggregatesFilter<"LandLordProfile"> | string
    street?: StringWithAggregatesFilter<"LandLordProfile"> | string
    preference?: EnumPreferenceWithAggregatesFilter<"LandLordProfile"> | $Enums.Preference
    userId?: StringWithAggregatesFilter<"LandLordProfile"> | string
  }

  export type RoleCreateInput = {
    name: string
    users?: UserCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateInput = {
    id?: number
    name: string
    users?: UserUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    users?: UserUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    users?: UserUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleCreateManyInput = {
    id?: number
    name: string
  }

  export type RoleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    fullName: string
    email: string
    phone: string
    password: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    role: RoleCreateNestedOneWithoutUsersInput
    tenants?: TenantProfileCreateNestedManyWithoutUserInput
    landlords?: LandLordProfileCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    fullName: string
    email: string
    phone: string
    password: string
    isVerified?: boolean
    roleId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tenants?: TenantProfileUncheckedCreateNestedManyWithoutUserInput
    landlords?: LandLordProfileUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    tenants?: TenantProfileUpdateManyWithoutUserNestedInput
    landlords?: LandLordProfileUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    roleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenants?: TenantProfileUncheckedUpdateManyWithoutUserNestedInput
    landlords?: LandLordProfileUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    fullName: string
    email: string
    phone: string
    password: string
    isVerified?: boolean
    roleId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    roleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantProfileCreateInput = {
    profileImage: string
    fullName: string
    phoneNumber: string
    street: string
    city: string
    state: string
    NIN: string
    user: UserCreateNestedOneWithoutTenantsInput
  }

  export type TenantProfileUncheckedCreateInput = {
    id?: number
    profileImage: string
    fullName: string
    phoneNumber: string
    street: string
    city: string
    state: string
    NIN: string
    userId: string
  }

  export type TenantProfileUpdateInput = {
    profileImage?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    NIN?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTenantsNestedInput
  }

  export type TenantProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileImage?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    NIN?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TenantProfileCreateManyInput = {
    id?: number
    profileImage: string
    fullName: string
    phoneNumber: string
    street: string
    city: string
    state: string
    NIN: string
    userId: string
  }

  export type TenantProfileUpdateManyMutationInput = {
    profileImage?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    NIN?: StringFieldUpdateOperationsInput | string
  }

  export type TenantProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileImage?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    NIN?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type LandLordProfileCreateInput = {
    profileImage: string
    typeOfHouse: string
    numberOfRooms: string
    otherInfo: string
    street: string
    preference?: $Enums.Preference
    user: UserCreateNestedOneWithoutLandlordsInput
  }

  export type LandLordProfileUncheckedCreateInput = {
    id?: number
    profileImage: string
    typeOfHouse: string
    numberOfRooms: string
    otherInfo: string
    street: string
    preference?: $Enums.Preference
    userId: string
  }

  export type LandLordProfileUpdateInput = {
    profileImage?: StringFieldUpdateOperationsInput | string
    typeOfHouse?: StringFieldUpdateOperationsInput | string
    numberOfRooms?: StringFieldUpdateOperationsInput | string
    otherInfo?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    preference?: EnumPreferenceFieldUpdateOperationsInput | $Enums.Preference
    user?: UserUpdateOneRequiredWithoutLandlordsNestedInput
  }

  export type LandLordProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileImage?: StringFieldUpdateOperationsInput | string
    typeOfHouse?: StringFieldUpdateOperationsInput | string
    numberOfRooms?: StringFieldUpdateOperationsInput | string
    otherInfo?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    preference?: EnumPreferenceFieldUpdateOperationsInput | $Enums.Preference
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type LandLordProfileCreateManyInput = {
    id?: number
    profileImage: string
    typeOfHouse: string
    numberOfRooms: string
    otherInfo: string
    street: string
    preference?: $Enums.Preference
    userId: string
  }

  export type LandLordProfileUpdateManyMutationInput = {
    profileImage?: StringFieldUpdateOperationsInput | string
    typeOfHouse?: StringFieldUpdateOperationsInput | string
    numberOfRooms?: StringFieldUpdateOperationsInput | string
    otherInfo?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    preference?: EnumPreferenceFieldUpdateOperationsInput | $Enums.Preference
  }

  export type LandLordProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileImage?: StringFieldUpdateOperationsInput | string
    typeOfHouse?: StringFieldUpdateOperationsInput | string
    numberOfRooms?: StringFieldUpdateOperationsInput | string
    otherInfo?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    preference?: EnumPreferenceFieldUpdateOperationsInput | $Enums.Preference
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type RoleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type RoleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RoleScalarRelationFilter = {
    is?: RoleWhereInput
    isNot?: RoleWhereInput
  }

  export type TenantProfileListRelationFilter = {
    every?: TenantProfileWhereInput
    some?: TenantProfileWhereInput
    none?: TenantProfileWhereInput
  }

  export type LandLordProfileListRelationFilter = {
    every?: LandLordProfileWhereInput
    some?: LandLordProfileWhereInput
    none?: LandLordProfileWhereInput
  }

  export type TenantProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LandLordProfileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    isVerified?: SortOrder
    roleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    roleId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    isVerified?: SortOrder
    roleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    isVerified?: SortOrder
    roleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    roleId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TenantProfileCountOrderByAggregateInput = {
    id?: SortOrder
    profileImage?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    NIN?: SortOrder
    userId?: SortOrder
  }

  export type TenantProfileAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TenantProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    profileImage?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    NIN?: SortOrder
    userId?: SortOrder
  }

  export type TenantProfileMinOrderByAggregateInput = {
    id?: SortOrder
    profileImage?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    street?: SortOrder
    city?: SortOrder
    state?: SortOrder
    NIN?: SortOrder
    userId?: SortOrder
  }

  export type TenantProfileSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumPreferenceFilter<$PrismaModel = never> = {
    equals?: $Enums.Preference | EnumPreferenceFieldRefInput<$PrismaModel>
    in?: $Enums.Preference[] | ListEnumPreferenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Preference[] | ListEnumPreferenceFieldRefInput<$PrismaModel>
    not?: NestedEnumPreferenceFilter<$PrismaModel> | $Enums.Preference
  }

  export type LandLordProfileCountOrderByAggregateInput = {
    id?: SortOrder
    profileImage?: SortOrder
    typeOfHouse?: SortOrder
    numberOfRooms?: SortOrder
    otherInfo?: SortOrder
    street?: SortOrder
    preference?: SortOrder
    userId?: SortOrder
  }

  export type LandLordProfileAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LandLordProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    profileImage?: SortOrder
    typeOfHouse?: SortOrder
    numberOfRooms?: SortOrder
    otherInfo?: SortOrder
    street?: SortOrder
    preference?: SortOrder
    userId?: SortOrder
  }

  export type LandLordProfileMinOrderByAggregateInput = {
    id?: SortOrder
    profileImage?: SortOrder
    typeOfHouse?: SortOrder
    numberOfRooms?: SortOrder
    otherInfo?: SortOrder
    street?: SortOrder
    preference?: SortOrder
    userId?: SortOrder
  }

  export type LandLordProfileSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumPreferenceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Preference | EnumPreferenceFieldRefInput<$PrismaModel>
    in?: $Enums.Preference[] | ListEnumPreferenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Preference[] | ListEnumPreferenceFieldRefInput<$PrismaModel>
    not?: NestedEnumPreferenceWithAggregatesFilter<$PrismaModel> | $Enums.Preference
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPreferenceFilter<$PrismaModel>
    _max?: NestedEnumPreferenceFilter<$PrismaModel>
  }

  export type UserCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type UserUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type RoleCreateNestedOneWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    connect?: RoleWhereUniqueInput
  }

  export type TenantProfileCreateNestedManyWithoutUserInput = {
    create?: XOR<TenantProfileCreateWithoutUserInput, TenantProfileUncheckedCreateWithoutUserInput> | TenantProfileCreateWithoutUserInput[] | TenantProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TenantProfileCreateOrConnectWithoutUserInput | TenantProfileCreateOrConnectWithoutUserInput[]
    createMany?: TenantProfileCreateManyUserInputEnvelope
    connect?: TenantProfileWhereUniqueInput | TenantProfileWhereUniqueInput[]
  }

  export type LandLordProfileCreateNestedManyWithoutUserInput = {
    create?: XOR<LandLordProfileCreateWithoutUserInput, LandLordProfileUncheckedCreateWithoutUserInput> | LandLordProfileCreateWithoutUserInput[] | LandLordProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LandLordProfileCreateOrConnectWithoutUserInput | LandLordProfileCreateOrConnectWithoutUserInput[]
    createMany?: LandLordProfileCreateManyUserInputEnvelope
    connect?: LandLordProfileWhereUniqueInput | LandLordProfileWhereUniqueInput[]
  }

  export type TenantProfileUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TenantProfileCreateWithoutUserInput, TenantProfileUncheckedCreateWithoutUserInput> | TenantProfileCreateWithoutUserInput[] | TenantProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TenantProfileCreateOrConnectWithoutUserInput | TenantProfileCreateOrConnectWithoutUserInput[]
    createMany?: TenantProfileCreateManyUserInputEnvelope
    connect?: TenantProfileWhereUniqueInput | TenantProfileWhereUniqueInput[]
  }

  export type LandLordProfileUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LandLordProfileCreateWithoutUserInput, LandLordProfileUncheckedCreateWithoutUserInput> | LandLordProfileCreateWithoutUserInput[] | LandLordProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LandLordProfileCreateOrConnectWithoutUserInput | LandLordProfileCreateOrConnectWithoutUserInput[]
    createMany?: LandLordProfileCreateManyUserInputEnvelope
    connect?: LandLordProfileWhereUniqueInput | LandLordProfileWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RoleUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    upsert?: RoleUpsertWithoutUsersInput
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUsersInput, RoleUpdateWithoutUsersInput>, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type TenantProfileUpdateManyWithoutUserNestedInput = {
    create?: XOR<TenantProfileCreateWithoutUserInput, TenantProfileUncheckedCreateWithoutUserInput> | TenantProfileCreateWithoutUserInput[] | TenantProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TenantProfileCreateOrConnectWithoutUserInput | TenantProfileCreateOrConnectWithoutUserInput[]
    upsert?: TenantProfileUpsertWithWhereUniqueWithoutUserInput | TenantProfileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TenantProfileCreateManyUserInputEnvelope
    set?: TenantProfileWhereUniqueInput | TenantProfileWhereUniqueInput[]
    disconnect?: TenantProfileWhereUniqueInput | TenantProfileWhereUniqueInput[]
    delete?: TenantProfileWhereUniqueInput | TenantProfileWhereUniqueInput[]
    connect?: TenantProfileWhereUniqueInput | TenantProfileWhereUniqueInput[]
    update?: TenantProfileUpdateWithWhereUniqueWithoutUserInput | TenantProfileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TenantProfileUpdateManyWithWhereWithoutUserInput | TenantProfileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TenantProfileScalarWhereInput | TenantProfileScalarWhereInput[]
  }

  export type LandLordProfileUpdateManyWithoutUserNestedInput = {
    create?: XOR<LandLordProfileCreateWithoutUserInput, LandLordProfileUncheckedCreateWithoutUserInput> | LandLordProfileCreateWithoutUserInput[] | LandLordProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LandLordProfileCreateOrConnectWithoutUserInput | LandLordProfileCreateOrConnectWithoutUserInput[]
    upsert?: LandLordProfileUpsertWithWhereUniqueWithoutUserInput | LandLordProfileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LandLordProfileCreateManyUserInputEnvelope
    set?: LandLordProfileWhereUniqueInput | LandLordProfileWhereUniqueInput[]
    disconnect?: LandLordProfileWhereUniqueInput | LandLordProfileWhereUniqueInput[]
    delete?: LandLordProfileWhereUniqueInput | LandLordProfileWhereUniqueInput[]
    connect?: LandLordProfileWhereUniqueInput | LandLordProfileWhereUniqueInput[]
    update?: LandLordProfileUpdateWithWhereUniqueWithoutUserInput | LandLordProfileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LandLordProfileUpdateManyWithWhereWithoutUserInput | LandLordProfileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LandLordProfileScalarWhereInput | LandLordProfileScalarWhereInput[]
  }

  export type TenantProfileUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TenantProfileCreateWithoutUserInput, TenantProfileUncheckedCreateWithoutUserInput> | TenantProfileCreateWithoutUserInput[] | TenantProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TenantProfileCreateOrConnectWithoutUserInput | TenantProfileCreateOrConnectWithoutUserInput[]
    upsert?: TenantProfileUpsertWithWhereUniqueWithoutUserInput | TenantProfileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TenantProfileCreateManyUserInputEnvelope
    set?: TenantProfileWhereUniqueInput | TenantProfileWhereUniqueInput[]
    disconnect?: TenantProfileWhereUniqueInput | TenantProfileWhereUniqueInput[]
    delete?: TenantProfileWhereUniqueInput | TenantProfileWhereUniqueInput[]
    connect?: TenantProfileWhereUniqueInput | TenantProfileWhereUniqueInput[]
    update?: TenantProfileUpdateWithWhereUniqueWithoutUserInput | TenantProfileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TenantProfileUpdateManyWithWhereWithoutUserInput | TenantProfileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TenantProfileScalarWhereInput | TenantProfileScalarWhereInput[]
  }

  export type LandLordProfileUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LandLordProfileCreateWithoutUserInput, LandLordProfileUncheckedCreateWithoutUserInput> | LandLordProfileCreateWithoutUserInput[] | LandLordProfileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LandLordProfileCreateOrConnectWithoutUserInput | LandLordProfileCreateOrConnectWithoutUserInput[]
    upsert?: LandLordProfileUpsertWithWhereUniqueWithoutUserInput | LandLordProfileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LandLordProfileCreateManyUserInputEnvelope
    set?: LandLordProfileWhereUniqueInput | LandLordProfileWhereUniqueInput[]
    disconnect?: LandLordProfileWhereUniqueInput | LandLordProfileWhereUniqueInput[]
    delete?: LandLordProfileWhereUniqueInput | LandLordProfileWhereUniqueInput[]
    connect?: LandLordProfileWhereUniqueInput | LandLordProfileWhereUniqueInput[]
    update?: LandLordProfileUpdateWithWhereUniqueWithoutUserInput | LandLordProfileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LandLordProfileUpdateManyWithWhereWithoutUserInput | LandLordProfileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LandLordProfileScalarWhereInput | LandLordProfileScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTenantsInput = {
    create?: XOR<UserCreateWithoutTenantsInput, UserUncheckedCreateWithoutTenantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTenantsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTenantsNestedInput = {
    create?: XOR<UserCreateWithoutTenantsInput, UserUncheckedCreateWithoutTenantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTenantsInput
    upsert?: UserUpsertWithoutTenantsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTenantsInput, UserUpdateWithoutTenantsInput>, UserUncheckedUpdateWithoutTenantsInput>
  }

  export type UserCreateNestedOneWithoutLandlordsInput = {
    create?: XOR<UserCreateWithoutLandlordsInput, UserUncheckedCreateWithoutLandlordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLandlordsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumPreferenceFieldUpdateOperationsInput = {
    set?: $Enums.Preference
  }

  export type UserUpdateOneRequiredWithoutLandlordsNestedInput = {
    create?: XOR<UserCreateWithoutLandlordsInput, UserUncheckedCreateWithoutLandlordsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLandlordsInput
    upsert?: UserUpsertWithoutLandlordsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLandlordsInput, UserUpdateWithoutLandlordsInput>, UserUncheckedUpdateWithoutLandlordsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumPreferenceFilter<$PrismaModel = never> = {
    equals?: $Enums.Preference | EnumPreferenceFieldRefInput<$PrismaModel>
    in?: $Enums.Preference[] | ListEnumPreferenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Preference[] | ListEnumPreferenceFieldRefInput<$PrismaModel>
    not?: NestedEnumPreferenceFilter<$PrismaModel> | $Enums.Preference
  }

  export type NestedEnumPreferenceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Preference | EnumPreferenceFieldRefInput<$PrismaModel>
    in?: $Enums.Preference[] | ListEnumPreferenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Preference[] | ListEnumPreferenceFieldRefInput<$PrismaModel>
    not?: NestedEnumPreferenceWithAggregatesFilter<$PrismaModel> | $Enums.Preference
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPreferenceFilter<$PrismaModel>
    _max?: NestedEnumPreferenceFilter<$PrismaModel>
  }

  export type UserCreateWithoutRoleInput = {
    id?: string
    fullName: string
    email: string
    phone: string
    password: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenants?: TenantProfileCreateNestedManyWithoutUserInput
    landlords?: LandLordProfileCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRoleInput = {
    id?: string
    fullName: string
    email: string
    phone: string
    password: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    tenants?: TenantProfileUncheckedCreateNestedManyWithoutUserInput
    landlords?: LandLordProfileUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRoleInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserCreateManyRoleInputEnvelope = {
    data: UserCreateManyRoleInput | UserCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
  }

  export type UserUpdateManyWithWhereWithoutRoleInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutRoleInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    isVerified?: BoolFilter<"User"> | boolean
    roleId?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type RoleCreateWithoutUsersInput = {
    name: string
  }

  export type RoleUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
  }

  export type RoleCreateOrConnectWithoutUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type TenantProfileCreateWithoutUserInput = {
    profileImage: string
    fullName: string
    phoneNumber: string
    street: string
    city: string
    state: string
    NIN: string
  }

  export type TenantProfileUncheckedCreateWithoutUserInput = {
    id?: number
    profileImage: string
    fullName: string
    phoneNumber: string
    street: string
    city: string
    state: string
    NIN: string
  }

  export type TenantProfileCreateOrConnectWithoutUserInput = {
    where: TenantProfileWhereUniqueInput
    create: XOR<TenantProfileCreateWithoutUserInput, TenantProfileUncheckedCreateWithoutUserInput>
  }

  export type TenantProfileCreateManyUserInputEnvelope = {
    data: TenantProfileCreateManyUserInput | TenantProfileCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LandLordProfileCreateWithoutUserInput = {
    profileImage: string
    typeOfHouse: string
    numberOfRooms: string
    otherInfo: string
    street: string
    preference?: $Enums.Preference
  }

  export type LandLordProfileUncheckedCreateWithoutUserInput = {
    id?: number
    profileImage: string
    typeOfHouse: string
    numberOfRooms: string
    otherInfo: string
    street: string
    preference?: $Enums.Preference
  }

  export type LandLordProfileCreateOrConnectWithoutUserInput = {
    where: LandLordProfileWhereUniqueInput
    create: XOR<LandLordProfileCreateWithoutUserInput, LandLordProfileUncheckedCreateWithoutUserInput>
  }

  export type LandLordProfileCreateManyUserInputEnvelope = {
    data: LandLordProfileCreateManyUserInput | LandLordProfileCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoleUpsertWithoutUsersInput = {
    update: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUsersInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RoleUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TenantProfileUpsertWithWhereUniqueWithoutUserInput = {
    where: TenantProfileWhereUniqueInput
    update: XOR<TenantProfileUpdateWithoutUserInput, TenantProfileUncheckedUpdateWithoutUserInput>
    create: XOR<TenantProfileCreateWithoutUserInput, TenantProfileUncheckedCreateWithoutUserInput>
  }

  export type TenantProfileUpdateWithWhereUniqueWithoutUserInput = {
    where: TenantProfileWhereUniqueInput
    data: XOR<TenantProfileUpdateWithoutUserInput, TenantProfileUncheckedUpdateWithoutUserInput>
  }

  export type TenantProfileUpdateManyWithWhereWithoutUserInput = {
    where: TenantProfileScalarWhereInput
    data: XOR<TenantProfileUpdateManyMutationInput, TenantProfileUncheckedUpdateManyWithoutUserInput>
  }

  export type TenantProfileScalarWhereInput = {
    AND?: TenantProfileScalarWhereInput | TenantProfileScalarWhereInput[]
    OR?: TenantProfileScalarWhereInput[]
    NOT?: TenantProfileScalarWhereInput | TenantProfileScalarWhereInput[]
    id?: IntFilter<"TenantProfile"> | number
    profileImage?: StringFilter<"TenantProfile"> | string
    fullName?: StringFilter<"TenantProfile"> | string
    phoneNumber?: StringFilter<"TenantProfile"> | string
    street?: StringFilter<"TenantProfile"> | string
    city?: StringFilter<"TenantProfile"> | string
    state?: StringFilter<"TenantProfile"> | string
    NIN?: StringFilter<"TenantProfile"> | string
    userId?: StringFilter<"TenantProfile"> | string
  }

  export type LandLordProfileUpsertWithWhereUniqueWithoutUserInput = {
    where: LandLordProfileWhereUniqueInput
    update: XOR<LandLordProfileUpdateWithoutUserInput, LandLordProfileUncheckedUpdateWithoutUserInput>
    create: XOR<LandLordProfileCreateWithoutUserInput, LandLordProfileUncheckedCreateWithoutUserInput>
  }

  export type LandLordProfileUpdateWithWhereUniqueWithoutUserInput = {
    where: LandLordProfileWhereUniqueInput
    data: XOR<LandLordProfileUpdateWithoutUserInput, LandLordProfileUncheckedUpdateWithoutUserInput>
  }

  export type LandLordProfileUpdateManyWithWhereWithoutUserInput = {
    where: LandLordProfileScalarWhereInput
    data: XOR<LandLordProfileUpdateManyMutationInput, LandLordProfileUncheckedUpdateManyWithoutUserInput>
  }

  export type LandLordProfileScalarWhereInput = {
    AND?: LandLordProfileScalarWhereInput | LandLordProfileScalarWhereInput[]
    OR?: LandLordProfileScalarWhereInput[]
    NOT?: LandLordProfileScalarWhereInput | LandLordProfileScalarWhereInput[]
    id?: IntFilter<"LandLordProfile"> | number
    profileImage?: StringFilter<"LandLordProfile"> | string
    typeOfHouse?: StringFilter<"LandLordProfile"> | string
    numberOfRooms?: StringFilter<"LandLordProfile"> | string
    otherInfo?: StringFilter<"LandLordProfile"> | string
    street?: StringFilter<"LandLordProfile"> | string
    preference?: EnumPreferenceFilter<"LandLordProfile"> | $Enums.Preference
    userId?: StringFilter<"LandLordProfile"> | string
  }

  export type UserCreateWithoutTenantsInput = {
    id?: string
    fullName: string
    email: string
    phone: string
    password: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    role: RoleCreateNestedOneWithoutUsersInput
    landlords?: LandLordProfileCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTenantsInput = {
    id?: string
    fullName: string
    email: string
    phone: string
    password: string
    isVerified?: boolean
    roleId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    landlords?: LandLordProfileUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTenantsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTenantsInput, UserUncheckedCreateWithoutTenantsInput>
  }

  export type UserUpsertWithoutTenantsInput = {
    update: XOR<UserUpdateWithoutTenantsInput, UserUncheckedUpdateWithoutTenantsInput>
    create: XOR<UserCreateWithoutTenantsInput, UserUncheckedCreateWithoutTenantsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTenantsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTenantsInput, UserUncheckedUpdateWithoutTenantsInput>
  }

  export type UserUpdateWithoutTenantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    landlords?: LandLordProfileUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTenantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    roleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    landlords?: LandLordProfileUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutLandlordsInput = {
    id?: string
    fullName: string
    email: string
    phone: string
    password: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    role: RoleCreateNestedOneWithoutUsersInput
    tenants?: TenantProfileCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLandlordsInput = {
    id?: string
    fullName: string
    email: string
    phone: string
    password: string
    isVerified?: boolean
    roleId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tenants?: TenantProfileUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLandlordsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLandlordsInput, UserUncheckedCreateWithoutLandlordsInput>
  }

  export type UserUpsertWithoutLandlordsInput = {
    update: XOR<UserUpdateWithoutLandlordsInput, UserUncheckedUpdateWithoutLandlordsInput>
    create: XOR<UserCreateWithoutLandlordsInput, UserUncheckedCreateWithoutLandlordsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLandlordsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLandlordsInput, UserUncheckedUpdateWithoutLandlordsInput>
  }

  export type UserUpdateWithoutLandlordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RoleUpdateOneRequiredWithoutUsersNestedInput
    tenants?: TenantProfileUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLandlordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    roleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenants?: TenantProfileUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyRoleInput = {
    id?: string
    fullName: string
    email: string
    phone: string
    password: string
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenants?: TenantProfileUpdateManyWithoutUserNestedInput
    landlords?: LandLordProfileUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenants?: TenantProfileUncheckedUpdateManyWithoutUserNestedInput
    landlords?: LandLordProfileUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TenantProfileCreateManyUserInput = {
    id?: number
    profileImage: string
    fullName: string
    phoneNumber: string
    street: string
    city: string
    state: string
    NIN: string
  }

  export type LandLordProfileCreateManyUserInput = {
    id?: number
    profileImage: string
    typeOfHouse: string
    numberOfRooms: string
    otherInfo: string
    street: string
    preference?: $Enums.Preference
  }

  export type TenantProfileUpdateWithoutUserInput = {
    profileImage?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    NIN?: StringFieldUpdateOperationsInput | string
  }

  export type TenantProfileUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileImage?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    NIN?: StringFieldUpdateOperationsInput | string
  }

  export type TenantProfileUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileImage?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    NIN?: StringFieldUpdateOperationsInput | string
  }

  export type LandLordProfileUpdateWithoutUserInput = {
    profileImage?: StringFieldUpdateOperationsInput | string
    typeOfHouse?: StringFieldUpdateOperationsInput | string
    numberOfRooms?: StringFieldUpdateOperationsInput | string
    otherInfo?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    preference?: EnumPreferenceFieldUpdateOperationsInput | $Enums.Preference
  }

  export type LandLordProfileUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileImage?: StringFieldUpdateOperationsInput | string
    typeOfHouse?: StringFieldUpdateOperationsInput | string
    numberOfRooms?: StringFieldUpdateOperationsInput | string
    otherInfo?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    preference?: EnumPreferenceFieldUpdateOperationsInput | $Enums.Preference
  }

  export type LandLordProfileUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileImage?: StringFieldUpdateOperationsInput | string
    typeOfHouse?: StringFieldUpdateOperationsInput | string
    numberOfRooms?: StringFieldUpdateOperationsInput | string
    otherInfo?: StringFieldUpdateOperationsInput | string
    street?: StringFieldUpdateOperationsInput | string
    preference?: EnumPreferenceFieldUpdateOperationsInput | $Enums.Preference
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}