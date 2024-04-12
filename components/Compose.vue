<script setup>
import { Editor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Paragraph from "@tiptap/extension-paragraph";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const editor = useState("editor", () => null);
const emit = defineEmits(['isSendingMail','isShowToast']);
const content = ref("");
const cc = ref("");
const bcc = ref("");
const isMinimize = ref(false);
const isSetCarbonCopy = ref(false);
const isSetBlindCarbonCopy = ref(false);

const setCarbonCopy = () => {
    isSetCarbonCopy.value = !isSetCarbonCopy.value
}
const setBlindCarbonCopy = () => {
    isSetBlindCarbonCopy.value = !isSetBlindCarbonCopy.value
}


onMounted(() => {
    editor.value = new Editor({
        content: content.value,
        onUpdate: ({ editor }) => {
            content.value = editor.getHTML()
        },
        extensions: [
            Placeholder.configure({
                placeholder: "Write something …",
                emptyNodeClass: "text-gray-600 dark:text-gray-400",
            }),
            StarterKit,
            Paragraph.configure({
                HTMLAttributes: {
                    class: "text-gray-600 dark:text-gray-400",
                },
            }),
            Bold.configure({
                HTMLAttributes: {
                    class: "font-bold",
                },
            }),
            Underline,
            Link.configure({
                HTMLAttributes: {
                    class:
                        "inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium dark:text-white",
                },
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: "list-disc list-inside text-gray-800 dark:text-white",
                },
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: "list-decimal list-inside text-gray-800 dark:text-white",
                },
            }),
            ListItem,
            Blockquote.configure({
                HTMLAttributes: {
                    class: "text-gray-800 sm:text-xl dark:text-white",
                },
            }),
            TextAlign,
            Image.configure({
                HTMLAttributes: {
                    class: "max-w-[10rem] max-h-[10rem] object-cover",
                },
            }),
        ],
    });
});


const setBold = () => {
    editor.value.chain().focus().toggleBold().run();
};

const setStrikethrough = () => {
    editor.value.chain().focus().toggleStrike().run();
};

const toggleItalic = () => {
    editor.value.chain().focus().toggleItalic().run();
};

const toggleUnderline = () => {
    editor.value.chain().focus().toggleUnderline().run();
};

const toggleBulletList = () => {
    editor.value.chain().focus().toggleBulletList().run();
};

const toggleOrderedList = () => {
    editor.value.chain().focus().toggleOrderedList().run();
};

onBeforeUnmount(() => {
    editor.value.destroy();
});

const recipient = useState("recipient", () => "");
const subject = useState("subject", () => "");

const sendMail = () => {
    emit('isShowToast', true)
    emit('isSendingMail', true)
    const data = {
        content: content.value,
        recipient: recipient.value,
        subject: subject.value,
        cc: cc.value,
        bcc: bcc.value,
    }
    editor.value.commands.setContent("");
    recipient.value = ""
    subject.value = ""
    cc.value = ""
    bcc.value = ""
}
const resetForm = () => {
    editor.value.commands.setContent("");
    recipient.value = ""
    subject.value = ""
    cc.value = ""
    bcc.value = ""
}

</script>

<template>
    <div>
        <div v-if="!isMinimize" class="inset-0 bg-background/10 backdrop-blur-sm" />
        <div class=" bottom-0 right-0 drop-shadow-2xl sm:right-16 text-sm shadow-lg shadow-cyan-500/200 rounded-t-lg z-30 overflow-hidden"
            :class="{
            'sm:w-[17rem] w-full bottom-0 h-[2.5rem]': isMinimize,
            'w-full sm:w-[30rem] h-[30rem]': !isMinimize,
        }">
            <div
                class="sticky bg-[#f2f5fc] dark:bg-green-dark-light p-3 flex items-center justify-between dark:border-b dark:border-gray-600/50">
                <p class="text-[#172846] dark:text-green-real">New Message</p>
                <div class="flex items-center space-x-2">
                    <button class="cursor-pointer dark:text-green-real">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    <button class="cursor-pointer dark:text-green-real">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                        </svg>
                    </button>
                    <button data-modal-hide="default-modal" @click="resetForm"
                        class="cursor-pointer dark:text-green-real">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <form @submit.prevent="sendMail" class="relative dark:bg-green-dark-light bg-white" :class="{
            'h-full w-full': !isMinimize,
            hidden: isMinimize,
        }">
                <div
                    class="flex px-3 relative items-center justify-between border-b border-gray-200 group dark:border-gray-600/50">
                    <p class="group-hover:block hidden dark:text-green-real">To</p>
                    <input type="text"
                        class="w-full text-sm outline-none border-0 focus:ring-0 bg-transparent group-hover:ml-0 -ml-2 group-hover:placeholder:text-transparent dark:placeholder:text-green-real dark:text-white"
                        placeholder="Recipient" v-model="recipient" />
                    <div v-if="!isSetCarbonCopy" class="group-hover:flex flex items-center space-x-2">
                        <button v-if="!isSetCarbonCopy" @click="setCarbonCopy"
                            class="hover:underline dark:text-green-real">
                            Cc
                        </button>
                        <button v-if="!isSetBlindCarbonCopy" @click="setBlindCarbonCopy"
                            class="hover:underline dark:text-green-real">
                            Bcc
                        </button>
                    </div>
                </div>
                <div>
                    <div v-if="isSetCarbonCopy"
                        class="flex items-center px-3 justify-between border-b border-gray-200 dark:border-gray-600/50">
                        <p class="dark:text-green-real">Cc</p>
                        <input type="text" v-model="cc"
                            class="w-full outline-none border-0 focus:ring-0 bg-transparent dark:text-white" />
                        <div v-if="isSetCarbonCopy" class="flex items-center space-x-2">
                            <button v-if="!isSetBlindCarbonCopy" @click="setBlindCarbonCopy"
                                class="hover:underline dark:text-green-real">
                                Bcc
                            </button>
                        </div>
                    </div>
                    <div v-if="isSetBlindCarbonCopy"
                        class="flex items-center px-3 justify-between border-b border-gray-200 dark:border-gray-600/50">
                        <p class="dark:text-green-real">Bcc</p>
                        <input type="text" v-model="bcc"
                            class="w-full outline-none border-0 focus:ring-0 bg-transparent dark:text-white" />
                    </div>
                </div>
                <div class="flex items-center px-3 justify-between border-b border-gray-200 dark:border-gray-600/50">
                    <input type="text"
                        class="-ml-2 w-full outline-none border-0 focus:ring-0 bg-transparent dark:placeholder:text-green-real dark:text-white"
                        placeholder="Subject" v-model="subject" />
                </div>
                <div
                    class="h-[15.5rem] overflow-hidden mt-1 px-3 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                    <EditorContent :editor="editor" v-model="content" data-hs-editor-field />
                </div>

                <!-- Compose Buttons -->
                <div class="bg-white dark:bg-green-dark-light absolute bottom-12 bg-transparent w-full py-2">
                    <div class="rounded-lg overflow-hidden">
                        <div>
                            <div class="flex align-middle gap-x-0.5 p-2">
                                <button @click="setBold" data-hs-editor-bold
                                    class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:text-green-real"
                                    type="button">
                                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M14 12a4 4 0 0 0 0-8H6v8" />
                                        <path d="M15 20a4 4 0 0 0 0-8H6v8Z" />
                                    </svg>
                                </button>
                                <button @click="toggleItalic"
                                    class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:text-green-real"
                                    type="button" data-hs-editor-italic>
                                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="19" x2="10" y1="4" y2="4" />
                                        <line x1="14" x2="5" y1="20" y2="20" />
                                        <line x1="15" x2="9" y1="4" y2="20" />
                                    </svg>
                                </button>
                                <button @click="toggleUnderline"
                                    class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:text-green-real"
                                    type="button" data-hs-editor-underline>
                                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M6 4v6a6 6 0 0 0 12 0V4" />
                                        <line x1="4" x2="20" y1="20" y2="20" />
                                    </svg>
                                </button>
                                <button @click="setStrikethrough"
                                    class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:text-green-real"
                                    type="button" data-hs-editor-strike>
                                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M16 4H9a3 3 0 0 0-2.83 4" />
                                        <path d="M14 12a4 4 0 0 1 0 8H6" />
                                        <line x1="4" x2="20" y1="12" y2="12" />
                                    </svg>
                                </button>
                                <button
                                    class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:text-green-real"
                                    type="button" data-hs-editor-link>
                                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                    </svg>
                                </button>
                                <button @click="toggleOrderedList"
                                    class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:text-green-real"
                                    type="button" data-hs-editor-ol>
                                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="10" x2="21" y1="6" y2="6" />
                                        <line x1="10" x2="21" y1="12" y2="12" />
                                        <line x1="10" x2="21" y1="18" y2="18" />
                                        <path d="M4 6h1v4" />
                                        <path d="M4 10h2" />
                                        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                                    </svg>
                                </button>
                                <button @click="toggleBulletList"
                                    class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:text-green-real"
                                    type="button" data-hs-editor-ul>
                                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="8" x2="21" y1="6" y2="6" />
                                        <line x1="8" x2="21" y1="12" y2="12" />
                                        <line x1="8" x2="21" y1="18" y2="18" />
                                        <line x1="3" x2="3.01" y1="6" y2="6" />
                                        <line x1="3" x2="3.01" y1="12" y2="12" />
                                        <line x1="3" x2="3.01" y1="18" y2="18" />
                                    </svg>
                                </button>
                                <button
                                    class="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:text-green-real"
                                    type="button" data-hs-editor-code>
                                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                        height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="m18 16 4-4-4-4" />
                                        <path d="m6 8-4 4 4 4" />
                                        <path d="m14.5 4-5 16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center px-2 justify-between">
                        <div class="flex items-center">
                            <button type="submit" data-modal-hide="default-modal"
                                class="block bg-blue-600 px-3 py-2 rounded-full sm:px-6 text-white mr-1">
                                <span>Send</span>
                            </button>
                            <div class="space-x-2 dark:text-green-real flex items-center">
                                <label for="dropzone-file">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <input id="dropzone-file" type="file" class="hidden" />
                                </label>
                                <label for="dropzone-file">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="w-5 h-5 text-gray-500 dark:text-gray-400">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                    </svg>
                                    <input id="dropzone-file" type="file" class="hidden" />
                                </label>
                                <label for="dropzone-file">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor"
                                        class="w-5 h-5 text-gray-500 dark:text-gray-400">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>
                                    <input id="dropzone-file" type="file" class="hidden" />
                                </label>
                            </div>
                        </div>
                        <button @click="resetForm" data-modal-hide="default-modal" class="block" type="reset">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-5 h-5 text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scope>
.ProseMirror:focus {
    outline: none;
}

.tiptap ul p,
.tiptap ol p {
    display: inline;
}

.tiptap p.is-editor-empty:first-child::before {
    font-size: 14px;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}
</style>
