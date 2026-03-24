---
title: "Understanding the Context Window"
description: "How the context window limits the amount of information an LLM can process and keep in the same session."
date: 2026-03-21
draft: false
tags: ["ai", "agents", "context", "window"]
---

## Introduction

One of the most important concepts when we start working with LLMs is the **context window**. Understanding what it is and how it works is key to optimizing the use of these models and getting better results.

In simple terms, the context window defines the amount of information that an LLM can process and keep within a single session. Every time we interact with it (prompts, responses, instructions, etc.), we are using space within that limit.

When we reach that limit, the model doesn’t exactly **"fail"**, but it does lose accuracy in its responses and may generate **incorrect or incomplete results**. This happens because when the model receives new information, part of the previous context gets discarded. In other words, it starts to **"forget"** things.

That’s why understanding how the context window works is not just a technical detail, but something central to improving the quality of responses and the efficiency of our interactions with these models.

Throughout this article, we’ll see **what the context window is**, **how it is structured**, **how it works**, and **how we can make better use of it** using current tools.

---

## How is the context window structured?

To understand how the context window is structured, we first need to review two key concepts: **tokens** and the **context** itself.

### Tokens

For a language model, text is not processed as complete words in the same way we perceive them. Instead, the text is split into smaller pieces called **tokens**.

Tokens are small units of information that result from splitting text based on words, punctuation, spaces, etc. For LLMs, short words can be represented by a **single token**, while longer words may need to be divided into **two or more tokens**.

For example, the sentence `Hello, how are you?` could be split into the following tokens:

`Hello` `,` `how` `are` `you` `?`

The way words are split and assigned to tokens is a complex process that depends on the specific model and its configuration. This means that, for a given model, the sentence `Hello, how are you?` could be tokenized in different ways. This has a direct impact on the **total context** and on the **cost** of using the model.

In the case of multimedia content (images, videos, audio, etc.), the **tokenization** process is even more complex, since the information must be converted into a format that the model can process. Briefly, we can mention the following cases:

#### 1. Images:

An image can be represented as a matrix of pixels, where each pixel has a value. For example:

* `pixel [0,0] = [255, 255, 255]` (white)
* `pixel [0,1] = [0, 0, 0]` (black)

Instead of processing the entire image, models usually divide it into small blocks called `patches` (for example, `16x16` pixels). Each patch is transformed into a numerical vector and then into a token. This allows the model to understand the image as a sequence of information, similar to how it processes text.

#### 2. Audio:

In this case, audio is usually converted into `spectrograms`, which show how sound waves evolve over time. These representations can be treated similarly to images, allowing a process equivalent to `patches`. Finally, that information is converted into vectors that the model interprets as tokens.

#### 3. Videos:

A video can be understood as a sequence of images plus audio, so the tokenization process is usually a combination of both approaches.

This process of converting information into tokens is what we call **tokenization**.

Understanding the concept of tokens is important because models always work within a **token limit** (`context window`). That limit defines how much information they can process at the same time.

---

### Context

Alongside the concept of tokens, the idea of *context* appears.

The context is the set of information (tokens) that the model uses to generate its next response. The **clearer**, **more relevant**, and **better structured** that context is, the higher the chances of getting a good response.

The model does not remember past conversations like a person would. It can only work with what is available inside its **current context window**. Once the context is lost (either by starting a new session or exceeding the limit), the model has no way to remember what was said before on its own. This explains why in long conversations, models may start to **forget details** mentioned at the beginning or **change their behavior** if relevant information is no longer available.

---

## How does the context window work?

With the previous concepts, the behavior becomes quite intuitive.

### Analogy

We can think of the context window like a supermarket conveyor belt. As you add products, the belt fills up until it reaches its limit. Once it’s full, if you want to keep adding more items, the ones you added first are removed because they already passed through the checkout.

**What you added first is the first thing the model stops taking into account.**

---

### Practical example

Let’s say we have a language model with a context window limited to **1000 tokens**.

At the beginning of the conversation, everything we send (prompts, instructions, previous responses, etc.) starts to use part of the available context. In these first interactions, let’s say I tell it something like *"Always call me Joaco"*.

As we keep interacting with the model, between messages and responses, the conversation grows and we eventually reach the **1000-token limit**. At that point, the window is completely full.

Now, if we want to keep adding more information, the model cannot simply expand that window. So, to process new content, it starts discarding the **oldest tokens**.

In practice, this means it starts losing **relevant information** from the conversation. For example, it might stop remembering that it should call me *"Joaco"* and start responding as if it never knew that.

---

## How can we optimize the use of context?

### 1. Avoid overloading with irrelevant information

Avoid writing instructions that are too long or include information that doesn’t directly contribute to the result we want. It’s not about **writing more**, but about **writing better**.

The more **noise** the context has, the harder it is for the model to identify what is actually important.

More information does **not** mean better results. What really matters is the **quality** and **structure** of that information.

---

### 2. Separate static context

A good way to work with context is to identify which information stays stable over time.

On one side, we have the **stable** or **static context**. These are rules, instructions, or preferences that we want the model to remember at all times.

On the other side, we have **dynamic context**, which is the specific information that is only relevant within the current task or conversation.

Many tools allow you to configure this context in a persistent way, but it can also be handled manually by adding it at the beginning of each interaction. This helps maintain **consistency** in the model’s behavior, even when the rest of the context changes or grows.

In the development world, this is often reflected in files like `AGENTS.md`, `CLAUDE.md`, among others, where the expected behavior and project constraints are defined. There are also mechanisms like `rules`, which allow setting more specific constraints on certain aspects.

These concepts are outside the scope of this article, but it’s important to know they exist and are part of good context management.

---

### 3. Summarize information and the current context

A good practice we can apply in our conversations is to periodically **summarize** what has already been done and continue from that summary.

Some tools already include features to **compact** or **summarize** the context, but we can also do it manually. We ask the model to generate a summary of the conversation, start a new clean session, and continue the work from that summary.

This helps keep the context clean, reduce token usage, and avoid losing important information.

---

### 4. Run isolated processes or tasks in separate sessions (Subagents)

Not all tasks need to share the same context. A very useful strategy is to split the work into **independent sessions**.

The main session is responsible for describing the problem or task, and then, in a new clean session, it is executed. Once completed, **only the result** is returned to the main session.

This way:

* We avoid **"polluting"** the main context with unnecessary information
* We maintain **better clarity** at each stage of the process
* We reduce the **risk of losing important information**

Many tools already support this workflow (with subagent features), but it can also be done manually without any issue.

---

## Conclusion

Understanding how the context window works completely changes the way we use LLMs.

It’s not just about *what* we ask the model, but also about **how** we manage the information we give it. Knowing **what to include**, **what gets discarded**, and **how context is prioritized** is key to getting better results.

---

## References

* [Explaining Tokens — the Language and Currency of AI](https://blogs.nvidia.com/blog/ai-tokens-explained/)
* [Tokenizer - OpenAI](https://platform.openai.com/tokenizer)
