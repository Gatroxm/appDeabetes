export interface NewsDto {
    _id?:string;
    exerpt:string;
    title: string
    content?: string;
    author?: string;
    date?: string;
    image?:string;
}