export type Post = {
	id: string;
	createdAt: string
	title: string;
	author: {
		name: string
		image: string
	}
	comments?: Comment[]
}

export type Comment = {
	createdAt: string;
	id: string;
	postId: string;
	authorId: string;
	message: string;
	author?: {
		name: string
		image: string
	}
}

export type MyPosts = {
	email: string
	id: string
	image: string
	name: string
	Post: {
		createdAt: string
		id: string
		title: string
		comments?: Comment[]
	}[]
}