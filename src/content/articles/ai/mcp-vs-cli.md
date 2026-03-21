---
title: "MCP vs CLI"
description: "A short opinionated take on the MCP vs CLI discussion."
date: 2026-03-15
draft: false
tags: ["ai", "agents", "tooling"]
---

## Introduction

Over the last few weeks, I have read several posts related to using **CLIs instead of MCPs** (I leave the references at the end). I found it a very interesting discussion, so I want to share a brief summary of the main arguments and also my opinion.

In general, the debate usually revolves around two main aspects:

* Efficient use of the **LLM context**
* **Security and control** over access to resources

But the discussion does not end there. Other factors are also mentioned, and they directly affect the development experience:

* Friction during setup and authentication
* Extensibility of features
* Debugging and observability of operations

## MCPs & CLIs

**MCP (Model Context Protocol)** works as a standardized interface so agents can interact with external applications or services through defined *tools* with explicit contracts.

On the other hand, **CLI (Command Line Interface)** represents the classic approach of using terminal tools through commands most developers already know (`git`, `docker`, `grep`, `aws`, etc.).

The difference between both approaches is not only technical, but also about priorities and ways of working:

* **MCP prioritizes control and standardization** over the capabilities an agent can use.
* **CLI prioritizes flexibility and composition**, using tools that already exist and have been proven for years.

## Context window usage

When we work with agents, one of the most valuable resources is the **context window**. It represents the maximum amount of information an LLM can process and keep in the same session.

In the case of **MCPs**, each exposed *tool* adds metadata: name, description, parameters, examples, etc. When the agent has access to many integrations, that tool catalog can end up consuming an important part of the available context.

In practice, this means the model can run out of useful context quickly, reducing the number of iterations we can do before responses start to noticeably degrade.

With **CLI**, instead, the agent has one specific capability: **executing commands**. The model decides what tool to use at the moment, without needing to preload a full catalog of integrations into context.

This helps keep the context window cleaner and more focused on the problem being solved.

## Security & Control

One area where **MCP has a clear advantage** is control over the capabilities available to the agent.

By exposing explicit tools, it is possible to limit exactly what actions the model can perform: read data, modify resources, run specific operations, etc. This is very useful in environments where we work with sensitive information or where strict limits are needed for security or compliance reasons (important in **enterprise environments**).

It is true that something similar can be achieved using custom CLIs or additional permission layers. However, when we give direct terminal access, in many cases we are giving the agent more control over the machine or server.

That is why, in contexts where governance is critical, **MCP can be a much safer option**.

## Developer Experience

Another point mentioned in the discussion is the **developer experience**.

In practice, working with multiple **MCPs** can introduce operational friction. Many times you need to:

* Initialize MCP servers.
* Authenticate in each integration.
* Enable or disable tools depending on the task to save context.
* Verify that everything is working correctly.

On the other hand, when something fails, finding the root cause can also be more complex, because it goes through the protocol layer and its implementation, which makes debugging harder.

With **CLIs**, instead, we usually work with flows we already know and that have been tested over the years. Authentication is normally solved with standard commands like:

* `npm login`
* `docker login`
* `gh auth login`

Also, if something fails, we can run the exact same commands the agent runs and inspect the result.

Finally, I would like to briefly add two limitations that sometimes appear with MCP:

* **Lower natural composability:** it does not have the same fluent chaining and piping as CLIs.
* **Dependency on server design:** if a tool is poorly designed or does not cover our needs, the agent is limited by that interface.

## Conclusion

Many of the problems people mention today about MCP are real. Probably many of us have experienced things like:

* An MCP server that does not start.
* Authentication problems.
* Tools that consume too much context.
* Friction when trying to use them.

In the end, this can affect productivity and make MCP usage feel uncomfortable.

However, that does not mean MCP has no value.

As we already mentioned, in scenarios where **control over access and the capabilities the agent has over our information and resources is important**, or where multiple teams need to share integrations in a secure and standardized way, MCP can be an ideal solution.

For example, large companies could offer their own internal MCPs (or even have their own marketplace), where tools are previously audited, limited, and approved for use inside the organization.

Also, when we do not have a CLI that covers a specific use case, MCP is the best option. MCP fulfills its goal of offering a standardized interface so agents can interact with those services, and it works well.

On the other hand, for many daily development workflows (especially those related to coding, debugging, or automation), the **CLI-based approach is still extremely powerful and practical**.

That is why, more than choosing one option over the other, the most realistic strategy is to **combine both approaches** depending on the context.

## References

* [CLI Is All You Need](https://x.com/mfranz_on/status/2021364017147818434)
* [CLI Is All You Need (relevant quote)](https://x.com/santtiagom_/status/2028916299133534301)
* [Should MCP Servers go away? A Look Beyond CLI and Skills](https://x.com/josecanciani/status/2028501054321533377)
* [Why We Removed MCP Integrations — And What We Built Instead](https://x.com/dzhng/status/2029518820872945889)