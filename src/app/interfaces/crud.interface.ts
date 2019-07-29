export interface ICrud {

    getObj(): void;
    newObj(): void;
    edit(obj: any);
    remove(obj: any);

}