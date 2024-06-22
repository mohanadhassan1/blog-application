Clone Repository:
git clone https://github.com/mohanadhassan1/blog-application.git

Deploy in vercel:
https://blog-application-tawny.vercel.app/


Instructions:
1. Open vercel link "Blog Web Application" -> https://blog-application-tawny.vercel.app/
2. It will open the Home page. 
3. After the loading happens, It appears the blogs from the jsonplaceholder API.
4. You can click "Read More" in any blog to opens the single detailed plog post.
5. using "Add" button to Add your first blog, providing the title and body.
6. Don't write less than 3 characters in title and 5 characters in body.
7. After adding the blog, it will be displayed in the home page.
8. Thank you for visiting our website!


Installations:
npx shadcn-ui@latest init                   # using for components
npm i next-themes                           # using in Navbar
npm i react-hook-form                       # using in Create Blog 
npm i zod                                   # using in Validation
npm i class-variance-authority              # using in Button component
npm i tailwind-merge                        # using for utils to merge tailwindcss
npm i clsx                                  # using for utils for inputs
npm i @reduxjs/toolkit                      # using for fetch Data & local Storage 
npm i lucide-react                          # using for icons
npm i react-loader-spinner                  # using in home page for load data
npm i uuid                                  # using for create unique ids


Project Structure:
├── app/                    # Next.js app
│   ├── blog/               # Single Detailed Blog Post page
│       ├── [id]/           # get specific Blog
│           ├── page.tsx      
│   ├── components/         # 
│       ├── ModeToggle.tsx  # Dark Mode
│       ├── Navbar.tsx      #
│       ├── PostBlog.tsx    # Display Blogs from fake API and new Blogs   
│       ├── theme-provider.tsx    
│   ├── create/             # Create new Blogs page
│       ├── page.tsx        #
│   ├── lib/                # 
│       ├── interfaces.ts   #
│   ├── globals.css         #    
│   ├── layout.tsx          # Route page
│   ├── not-found.tsx       # 404 page
│   ├── page.tsx            # Home page
├── components/             # Reusable components
│   ├── ui/                 
│       ├── button.tsx        
│       ├── card.tsx
│       ├── dropdown-menu.tsx        
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── use-toast.tsx
├── lib/                    # 
│   ├── utils.tsx           # 
├── store/                  # Redux toolkit
│   ├── slice/              #
│       ├── blogSlice.tsx   #
│       ├── createSlice.tsx #
│   ├── index.ts            # 
│   ├── providers.tsx       # 
├── zod/                    # Zod Schema
│   ├── zodSchema.tsx       # 
├── public/                 # Public assets (images, icons, etc.)
├── README.md               # Project README file
├── package.json            # Node.js dependencies and scripts




This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.