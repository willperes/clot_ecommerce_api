import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("category", table => {
        table.increments("id").primary()
        table.string("title").notNullable().unique()
        table.string("image").notNullable()
        table.timestamp("created_at").notNullable()
        table.timestamp("updated_at").notNullable()
    })

    await knex.schema.createTable("product", table => {
        table.increments("id").primary()
        table.string("title").notNullable()
        table.string("subtitle").notNullable()
        table.integer("category_id").unsigned().notNullable()
        table.foreign("category_id").references("id").inTable("category")
        table.text("description").notNullable()
        table.json("images").notNullable()
        table.double("price").notNullable().unsigned()
        table.timestamp("created_at").notNullable()
        table.timestamp("updated_at").notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("product")
}

