import { action, computed, makeObservable, observable } from "mobx";
import agent from "../../api/agent";
import { handleRequestError } from "../../api/apiUtils";
import Entity, { EntityFormValues } from "../../common/models/Entity";
import { BaseUserResource } from "../../api/baseResource";
import { PaginationParams } from "../models/paginationPrams";

export default class BaseUserStore<TEntity extends Entity, TEntityFormValues extends EntityFormValues> {
    _items: TEntity[] = [];
    _selectedItem: TEntity | undefined = undefined;
    resource: BaseUserResource<TEntity, TEntityFormValues>

    constructor(entityType: string) {
        makeObservable(this, {
            _items: observable,
            _selectedItem: observable,
            items: computed,
            selectedItem: computed,
            setItems: action,
            createItem: action,
            updateItem: action,
            deleteItem: action,
            setSelectedItem: action,
            load: action,
            get: action,
            create: action,
            update: action,
            delete: action
        });

        this.resource = agent.createUserResource<TEntity, TEntityFormValues>(entityType);
    }

    get items(): TEntity[] {
        return this._items;
    }

    setItems(items: TEntity[]): void {
        this._items.splice(0, this._items.length)
        this._items.push(...items)
    }

    createItem(item: TEntity): void {
        this._items.push(item)
    }

    updateItem(id: string, formValues: TEntityFormValues): void {
        const index = this._items.findIndex((e) => e.id === id);
        if (index !== -1) {
            this._items[index] = { ...this._items[index], ...formValues };
        }
    }

    deleteItem(id: string): void {
        const itemIndex = this._items.findIndex(item => item.id === id);
        this._items.splice(itemIndex)
        // this._items = this._items.filter((item) => item.id !== id);
    }

    get selectedItem(): TEntity | undefined {
        return this._selectedItem;
    }

    setSelectedItem(item: TEntity | undefined): void {
        this._selectedItem = item;
    }

    load = async (params?: PaginationParams) => {
        try {
            const items = await this.resource.listByUser(params);
            this.setItems(items);
        } catch (error) {
            handleRequestError(error);
        }
    };

    get = async (id: string) => {
        try {
            const item = await this.resource.details(id);
            this.setSelectedItem(item);
        } catch (error) {
            handleRequestError(error);
        }
    };

    create = async (formValues: TEntityFormValues) => {
        try {
            const createdItem = await this.resource.create(formValues);
            this.createItem(createdItem);
            return createdItem;
        } catch (error) {
            handleRequestError(error);
            return null;
        }
    };

    update = async (id: string, formValues: TEntityFormValues) => {
        try {
            await this.resource.update(id, formValues);
            this.updateItem(id, formValues)
        } catch (error) {
            handleRequestError(error);
        }
    };

    delete = async (id: string) => {
        try {
            const deletedItem = await this.resource.delete(id);
            this.deleteItem(id);
            return deletedItem;
        } catch (error) {
            handleRequestError(error);
            return null;
        }
    };
}
