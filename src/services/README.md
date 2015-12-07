### Services (From T3js Docs)

Do think about your public interface. You are creating a utility that is designed to be used by someone else, make sure the interface makes sense.
Do create services with a single responsibility.
Do create services that can be used by more than one module.
Don't reference Box.Application directly in your creator function; do use the application object that is passed in.
Don't create global objects inside of the creator function; do reference other services through the application object when you need them.

### Why Are Services Important?

Services encapsulate non-application logic into reusable objects.
Because we can't anticipate what sort of capabilities modules will need, services act as an extension for new functionality.
Services may act as an abstraction layer that allows us to swap out low-level utilities without requiring changes to modules.
