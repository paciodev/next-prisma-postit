export type Post = {
	type: string;
	id: string;
	createdAt: string
	title: string;
	author: {
		name: string
		image: string
	}
	comments?: {
		createdAt: string
		id: string
		postId: string
		authorId: string
		message: string
	}[]
}

export type Comment = {
	createdAt: string;
	id: string;
	postId: string;
	authorId: string;
	message: string;
}