import Sequelize from "sequelize";
import { Base } from "./entity/base.entity";
import { createCipheriv, scryptSync } from "crypto";

export function GetNormalColumn() {
  return function (target) {
    debugger;
    console.log(target);
  };
}

export function encryptPassword(password) {
  let a = scryptSync(password, "salt", 24);
  let c = createCipheriv("aes-192-cbc", a, a.toString("base64").substring(16));
  let d = c.update("abcdefghijklmnopqrstuvwxyz", "utf8", "hex");
  d += c.final("hex");
  return d;
}

export function comparePassword(password, dbPassword) {
  return encryptPassword(password) === dbPassword;
}

export function testType(type) {
  switch (type) {
    case "STRING":
      return Sequelize.STRING;
    case "INTEGER":
      return Sequelize.INTEGER;
    case "BOOLEAN":
      return Sequelize.BOOLEAN;
    case "TEXT":
      return Sequelize.TEXT;
    case "DATE":
      return Sequelize.DATE;
    default:
      return Sequelize.STRING;
  }
}

export async function initTableModels(sequelize) {
  var { tables, table_columns } = sequelize.models;
  var models = await tables.findAll();
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    let tc = await table_columns.findAll({ where: { table_name: model.name } });
    let config = {};
    tc.forEach((c) => {
      config[c.name] = testType(c.type);
    });
    sequelize.define(model.name, config);
  }
}

export async function buildTablesData(sequelize) {
  //'id', 'createdAt', 'updatedAt'
  var ignoreTableColumn = [];
  var { tables, table_columns } = sequelize.models;
  try {
    var modelKeys = Object.keys(sequelize.models).filter((t) =>
      !["Session", "Sessions"].includes(t)
    );
    for (let index = 0; index < modelKeys.length; index++) {
      let t = modelKeys[index];
      let [table] = await tables.findOrCreate({
        where: {
          name: t,
        },
        defaults: {
          name: t,
          label: t,
        },
      });
      let model = sequelize.models[t];
      var tableAttributesKeys = Object.keys(model.tableAttributes).filter((t) =>
        !ignoreTableColumn.includes(t)
      );
      for (let index2 = 0; index2 < tableAttributesKeys.length; index2++) {
        let tableAttributesKey = tableAttributesKeys[index2];
        await table_columns.findOrCreate({
          where: {
            table_id: table.id,
            name: tableAttributesKey,
          },
          defaults: {
            table_name: t,
            name: tableAttributesKey,
            label: tableAttributesKey,
            type:
              model.tableAttributes[tableAttributesKey].type.constructor.name,
          },
        });
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export function defaultModel(sequelize) {
  var baseProp = Reflect.getMetadata("sequelize:attributes", Base.prototype);
  const servers = sequelize.define("servers", {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    host: Sequelize.STRING,
    port: Sequelize.INTEGER,
    keyPath: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    remote_path: Sequelize.STRING,
    local_path: Sequelize.STRING,
    ignore: Sequelize.STRING,
    exec: Sequelize.STRING,
    stat: Sequelize.INTEGER,
    tag: Sequelize.STRING,
    ...baseProp,
  });

  const publishStrategies = sequelize.define("publish_strategies", {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    script: Sequelize.STRING,
    stat: Sequelize.INTEGER,
    tag: Sequelize.STRING,
    ...baseProp,
  });

  const packStrategies = sequelize.define("pack_strategies", {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    script: Sequelize.STRING,
    stat: Sequelize.INTEGER,
    tag: Sequelize.STRING,
  });

  const privateKeys = sequelize.define("private_keys", {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    path: Sequelize.STRING,
    tag: Sequelize.STRING,
  });

  const project = sequelize.define("projects", {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    git: Sequelize.STRING,
    branch: Sequelize.STRING,
    keyPath: Sequelize.STRING,
    tag: Sequelize.STRING,
    stat: Sequelize.INTEGER,
  });

  const tasks = sequelize.define("tasks", {
    arg: Sequelize.STRING,
    cmd: Sequelize.STRING,
    pid: Sequelize.INTEGER,
    description: Sequelize.STRING,
    type: Sequelize.STRING,
    stat: Sequelize.STRING,
    result: Sequelize.STRING,
    tag: Sequelize.STRING,
  });

  const schedules = sequelize.define("schedules", {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    schedule: Sequelize.STRING,
    stat: Sequelize.STRING,
    startDateTime: Sequelize.DATE,
    endDateTime: Sequelize.DATE,
    tag: Sequelize.STRING,
  });

  const session = sequelize.define("sessions", {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    userId: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.TEXT,
  });
}

