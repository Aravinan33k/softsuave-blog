/**
 * Mobile hire pages: Android, iOS, Swift, Kotlin, Flutter, React Native, Ionic.
 *
 * Android/Kotlin and iOS/Swift are deliberately written as different pages
 * rather than near-copies. The platform pages (Android, iOS) argue about
 * shipping to a store — release process, fragmentation, review, OS upgrades.
 * The language pages (Kotlin, Swift) argue about the language and where it now
 * runs beyond that one platform: Kotlin Multiplatform and Ktor, Swift on
 * macOS/watchOS and the server. Reading both should not feel like reading the
 * same page twice, because a buyer searching each term wants different things.
 */

import type { HireSkill } from "./hire-skill";

const android: HireSkill = {
  slug: "hire-android-developers",
  key: "android",
  name: "Android",
  role: "Android Developers",
  metaTitle: "Hire Android App Developers",
  metaDescription:
    "Hire Android developers from Soft Suave for Kotlin apps built with Jetpack Compose — real device coverage, Play Store release discipline. You interview, two-week trial.",
  serviceType: "Android development staffing",
  eyebrow: "Hire Android Developers",
  ctaLabel: "Hire Android developers",
  titleLines: ["Hire Android Developers", "Who Ship Through Review, Repeatedly"],
  heroBody: [
    "Android development is not only writing Kotlin. It is shipping to a device population that spans seven OS versions, a dozen manufacturer skins, and screens from compact phones to foldables — and doing that on a release cadence that does not break for a month at a time.",
    "Our Android engineers have released and maintained apps in the Play Store rather than only built them. That shows in what they do before the first line of feature code: baseline device matrix, crash reporting, staged rollout.",
  ],
  heroPoints: [
    "Kotlin with Jetpack Compose and Material 3",
    "Real device fragmentation and foldable coverage",
    "Play Store release, staged rollout and policy review",
    "Offline-first data with Room and WorkManager",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/svc-mobile.webp",
    width: 1200,
    height: 860,
    alt: "An Android application shown across phone, tablet, and foldable form factors",
  },
  requirementLabel: "What are you building for Android?",
  requirementPlaceholder:
    "The app, whether it exists already, your minimum SDK and device targets, backend integrations, and the seniority you need.",
  overviewTitle: "What Android Developers Actually Do for You",
  overviewParagraphs: [
    "Android's defining engineering constraint is variance. Unlike iOS, you are targeting devices from many manufacturers with different OS versions, screen geometries, memory budgets, and aggressive battery-optimisation behaviour that will silently kill your background work. A feature that works perfectly on a current Pixel can fail entirely on a three-year-old mid-range handset, and that is a normal part of the job rather than an edge case.",
    "An Android engagement covers UI in Jetpack Compose, architecture around ViewModels and a repository layer, local persistence with Room, background and deferred work through WorkManager, networking, push notifications, and the release pipeline: signing, staged rollout, crash monitoring, and Play Store policy compliance.",
    "That last item is where inexperienced teams lose weeks. Play policy around permissions, background location, data-safety declarations, and target-SDK deadlines is enforced strictly and changes regularly, and a rejected release blocks everything behind it. Engineers who have been through it plan for it rather than discovering it.",
  ],
  pullQuote:
    "Android's hard problems are not language problems. They are a rejected Play release and a Samsung device killing your background job.",
  capabilities: [
    {
      name: "Native Android Apps",
      tag: "Build",
      body: "Applications in Kotlin with Jetpack Compose, Material 3, and a clear architecture — production apps rather than prototypes, built to be handed over and maintained by whoever comes next.",
    },
    {
      name: "Legacy App Modernization",
      tag: "Migration",
      body: "Java to Kotlin, XML layouts to Compose, and AsyncTask or RxJava to coroutines — migrated incrementally inside a shipping app, since Compose and Views interoperate deliberately well.",
    },
    {
      name: "Offline-First Behaviour",
      tag: "Data",
      body: "Room persistence with sync, conflict resolution, and WorkManager for deferred work that survives process death, reboots, and the battery optimisation manufacturers apply on top of stock Android.",
    },
    {
      name: "Device and Form-Factor Coverage",
      tag: "Compatibility",
      body: "Adaptive layouts for phones, tablets, and foldables, plus a real device matrix in testing — because the emulator does not reproduce the manufacturer behaviour that causes most field crashes.",
    },
    {
      name: "Release Engineering",
      tag: "Release",
      body: "Play Console setup, signing and Play App Signing, internal and staged rollouts, data-safety declarations, target-SDK compliance, and crash and ANR monitoring with alerting that someone acts on.",
    },
    {
      name: "Performance and Battery",
      tag: "Performance",
      body: "Startup-time profiling with baseline profiles, jank analysis, memory-leak detection, and reducing the wakelock and network behaviour that gets an app flagged as a battery drain by the system.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["Kotlin", "Jetpack Compose", "Coroutines / Flow", "Material 3", "Android SDK 35", "Java"],
    },
    {
      name: "Architecture & Data",
      items: ["Room", "WorkManager", "Hilt", "Retrofit", "DataStore", "Paging 3"],
    },
    {
      name: "Platform Services",
      items: ["Firebase", "FCM Push", "Play Billing", "ML Kit", "CameraX", "Maps SDK"],
    },
    {
      name: "Quality & Release",
      items: ["JUnit", "Espresso", "Compose UI Test", "Firebase Test Lab", "Crashlytics", "Play Console"],
    },
  ],
  faqs: [
    {
      q: "Do you build in Kotlin or Java?",
      a: "Kotlin for anything new — it has been Google's preferred Android language since 2019, and the current Jetpack libraries and Compose are designed around it. Our engineers work in Java where your existing codebase is Java, and can migrate incrementally file by file, since the two interoperate cleanly. A wholesale Java-to-Kotlin conversion as a project in its own right is rarely worth funding on its own; done alongside feature work it costs almost nothing.",
    },
    {
      q: "How do you handle Android device fragmentation?",
      a: "By deciding the target explicitly rather than inheriting a default. We agree a minimum SDK from your actual user analytics, then build a device matrix weighted toward what your users carry — which usually means mid-range Samsung and Xiaomi handsets rather than flagship Pixels. Automated tests run against that matrix in Firebase Test Lab, and manufacturer-specific battery optimisation is treated as a known hazard for background work, not a surprise found in production.",
    },
    {
      q: "Jetpack Compose or XML layouts?",
      a: "Compose for new work: it is Google's strategic direction, the tooling has matured, and it is substantially faster to build and iterate in. XML views remain fully supported and there is no urgency to rewrite a working app. In existing codebases the usual approach is Compose for new screens with interoperability into the existing view hierarchy, which lets the migration follow feature work rather than needing its own budget.",
    },
    {
      q: "Can you take over an existing Android app?",
      a: "Yes, and it is common. The first week is an audit: getting a reproducible build, reviewing the architecture and dependency versions, checking target-SDK compliance against Play's current deadlines, and looking at crash-free rates. That produces a short list of what genuinely needs attention before feature work resumes — often an SDK-level upgrade, since Play enforces target-SDK requirements on a schedule and a non-compliant app cannot ship updates at all.",
    },
  ],
};

const ios: HireSkill = {
  slug: "hire-ios-developers",
  key: "ios",
  name: "iOS",
  role: "iOS Developers",
  metaTitle: "Hire iOS App Developers",
  metaDescription:
    "Hire iOS developers from Soft Suave for Swift and SwiftUI apps built to pass App Review. Human Interface Guidelines, TestFlight, staged release. You interview, two-week trial.",
  serviceType: "iOS development staffing",
  eyebrow: "Hire iOS Developers",
  ctaLabel: "Hire iOS developers",
  titleLines: ["Hire iOS Developers", "Who Get Through App Review"],
  heroBody: [
    "iOS gives you a narrow, current device population and a demanding audience: users update quickly, expect the platform's own interaction conventions, and notice when an app does not follow them.",
    "The gate is App Review. Privacy declarations, account deletion, subscription rules, and tracking permission are enforced, and a rejection can cost a release cycle. Our iOS engineers have shipped repeatedly and build to that standard by default.",
  ],
  heroPoints: [
    "Swift and SwiftUI, with UIKit where it is still required",
    "App Review, privacy manifests and StoreKit compliance",
    "TestFlight, phased release and crash monitoring",
    "Widgets, App Intents, and deep platform integration",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-8.png",
    width: 1536,
    height: 1024,
    alt: "An iOS application shown across iPhone and iPad with native interface conventions",
  },
  requirementLabel: "What are you building for iOS?",
  requirementPlaceholder:
    "The app, whether it exists already, your minimum iOS target, backend integrations, and the seniority you need.",
  overviewTitle: "What iOS Developers Actually Do for You",
  overviewParagraphs: [
    "iOS engineering trades Android's device variance for Apple's process. The hardware and OS population is narrow and current, so a feature that works on one device works essentially everywhere — but everything ships through App Review, and Apple's requirements around privacy, subscriptions, account deletion, and data collection are enforced rather than advisory.",
    "An iOS engagement covers SwiftUI interfaces built to the Human Interface Guidelines, architecture and state management, local persistence with SwiftData or Core Data, networking with modern Swift concurrency, push notifications, and the release pipeline through Xcode Cloud or Fastlane, TestFlight, and phased App Store release.",
    "Where iOS rewards depth is platform integration. Widgets, App Intents and Siri, Live Activities, Handoff, and the share sheet are what make an app feel native rather than transplanted, and they are also what Apple's editorial and review teams notice. An engineer who has only ported interfaces across from another platform will not reach for them.",
  ],
  pullQuote:
    "On iOS the hard deadline is not your sprint. It is App Review, and it does not negotiate about your launch date.",
  capabilities: [
    {
      name: "Native iOS Apps",
      tag: "Build",
      body: "Applications in Swift with SwiftUI, following the Human Interface Guidelines so the app behaves the way iOS users already expect rather than importing another platform's conventions.",
    },
    {
      name: "UIKit to SwiftUI Migration",
      tag: "Migration",
      body: "Incremental migration of established UIKit codebases using the interoperability layers, screen by screen inside a shipping app, rather than a rewrite that stops delivery for two quarters.",
    },
    {
      name: "App Review and Compliance",
      tag: "Release",
      body: "Privacy manifests, App Tracking Transparency, data-collection declarations, account-deletion requirements, and StoreKit subscription rules handled before submission rather than after a rejection.",
    },
    {
      name: "Platform Integration",
      tag: "Native",
      body: "Widgets, App Intents and Siri, Live Activities, Sign in with Apple, Apple Pay, HealthKit, and the share sheet — the integrations that distinguish a native app from a wrapped web view.",
    },
    {
      name: "Offline and Sync",
      tag: "Data",
      body: "SwiftData or Core Data persistence with CloudKit sync where it fits, background refresh, and conflict handling that behaves sensibly when a user has been offline for a week.",
    },
    {
      name: "Release Engineering",
      tag: "Operations",
      body: "Fastlane or Xcode Cloud pipelines, certificate and provisioning management, TestFlight distribution, phased rollout, and crash monitoring wired to alerts someone actually receives.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["Swift 5.10", "SwiftUI", "UIKit", "Swift Concurrency", "Combine", "Objective-C"],
    },
    {
      name: "Data & Frameworks",
      items: ["SwiftData", "Core Data", "CloudKit", "URLSession", "StoreKit 2", "WidgetKit"],
    },
    {
      name: "Platform Services",
      items: ["APNs Push", "Sign in with Apple", "Apple Pay", "HealthKit", "MapKit", "Core ML"],
    },
    {
      name: "Quality & Release",
      items: ["XCTest", "XCUITest", "Fastlane", "Xcode Cloud", "TestFlight", "Crashlytics"],
    },
  ],
  faqs: [
    {
      q: "SwiftUI or UIKit?",
      a: "SwiftUI for new work — it is Apple's strategic direction, considerably faster to build in, and the only way to build widgets, Live Activities, and watchOS interfaces. UIKit is still required for some advanced customisation, complex collection layouts, and very fine-grained control, and it remains fully supported. In practice most current apps are predominantly SwiftUI with UIKit where it earns its place, and the two interoperate well enough that it is not an either/or decision.",
    },
    {
      q: "How do you avoid App Store rejections?",
      a: "By treating the guidelines as requirements during development rather than a checklist at submission. The recurring causes are missing or inaccurate privacy declarations, offering purchases outside StoreKit where Apple requires it, no account-deletion path when accounts can be created in-app, misusing App Tracking Transparency, and broken or incomplete review credentials. We check all of those before submitting, and where an app does something genuinely unusual we raise it with review in advance rather than hoping.",
    },
    {
      q: "What iOS versions should we support?",
      a: "Usually the current version and the two before it, which typically reaches well over ninety-five per cent of active devices because iOS adoption is fast. Supporting further back costs real engineering time — you lose access to newer APIs or have to branch around them — so it should be a decision made from your own analytics rather than a default. For enterprise apps on managed devices the answer is sometimes different, since fleet upgrades lag consumer behaviour.",
    },
    {
      q: "Can you take over an existing iOS app?",
      a: "Yes. The first week is an audit: a reproducible build on current Xcode, certificate and provisioning access, dependency and deployment-target review, architecture assessment, and crash-free rate. Apps that have been idle for a year or more usually need Xcode and SDK updates before anything else can happen, because Apple enforces a minimum SDK for new submissions — that work is scoped explicitly rather than absorbed silently into the first sprint.",
    },
  ],
};

const swift: HireSkill = {
  slug: "hire-swift-developers",
  key: "swift",
  name: "Swift",
  role: "Swift Developers",
  metaTitle: "Hire Swift Developers",
  metaDescription:
    "Hire Swift developers from Soft Suave for iOS, iPadOS, macOS, watchOS, and server-side Swift. Modern concurrency and SwiftUI. You interview, two-week trial.",
  serviceType: "Swift development staffing",
  eyebrow: "Hire Swift Developers",
  ctaLabel: "Hire Swift developers",
  titleLines: ["Hire Swift Developers", "For Every Apple Platform, Not Just iPhone"],
  heroBody: [
    "Swift is a fast, memory-safe, strongly typed language whose reach now extends well past the iPhone: macOS and watchOS apps, visionOS, command-line tooling, and server-side services with Vapor all share one codebase and one language.",
    "Hiring for the language rather than the platform makes sense when your product spans several Apple surfaces, or when you want shared model and business logic across them instead of three separate implementations.",
  ],
  heroPoints: [
    "Swift 5.10 with strict concurrency and actors",
    "iOS, iPadOS, macOS, watchOS and visionOS",
    "SwiftUI shared across platforms with adaptive layouts",
    "Swift Packages and server-side Swift with Vapor",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-1.webp",
    width: 800,
    height: 1000,
    alt: "A Swift codebase shared across iPhone, iPad, Mac, and Watch applications",
  },
  requirementLabel: "What are you building in Swift?",
  requirementPlaceholder:
    "The platforms involved — iOS, macOS, watchOS, server — what is shared between them, and the seniority you need.",
  overviewTitle: "What Swift Developers Actually Do for You",
  overviewParagraphs: [
    "Swift replaced Objective-C as Apple's language and has since become considerably more than an app language. Its type system eliminates whole categories of runtime error, its concurrency model — async/await, actors, and strict data-race checking — makes correct concurrent code far more achievable than the callback-and-lock approach it replaced, and Swift Packages make sharing code across targets straightforward.",
    "Hiring a Swift developer rather than an iOS developer is the right framing when the work spans platforms: a Mac companion to an iOS app, a watchOS extension, shared model and networking layers packaged for reuse, or a Vapor service written in the same language as the client that calls it.",
    "The area where current Swift expertise matters most is concurrency. Swift 6's strict concurrency checking turns data races into compile-time errors, which is a genuine advance and also a migration that surfaces latent bugs in existing code. Engineers who have done that migration are meaningfully more useful than those who have only read about it.",
  ],
  pullQuote:
    "Swift's strict concurrency checking does not create new bugs. It reveals the data races that were always there.",
  capabilities: [
    {
      name: "Multi-Platform Apple Apps",
      tag: "Platforms",
      body: "One codebase serving iOS, iPadOS, macOS, and watchOS with shared logic and adaptive interfaces, rather than three independent implementations that drift apart within two releases.",
    },
    {
      name: "Swift Concurrency",
      tag: "Architecture",
      body: "async/await, actors, structured task management, and migration to strict concurrency checking — replacing completion handlers and manual locking with code the compiler can verify.",
    },
    {
      name: "Shared Swift Packages",
      tag: "Reuse",
      body: "Model, networking, and business logic extracted into versioned Swift Packages consumed by every target, so a change to a shared rule happens in one place rather than being reimplemented per app.",
    },
    {
      name: "macOS Applications",
      tag: "Desktop",
      body: "Native Mac applications using AppKit or SwiftUI, including menu-bar utilities, document-based apps, and the sandboxing and notarisation requirements of distributing outside the Mac App Store.",
    },
    {
      name: "Server-Side Swift",
      tag: "Back end",
      body: "Vapor services for teams who want one language across client and server, with the shared model types that removes an entire class of client-server contract mismatch.",
    },
    {
      name: "Objective-C Interop",
      tag: "Migration",
      body: "Working inside mixed codebases and migrating Objective-C to Swift incrementally, with the bridging headers and nullability annotations that keep both halves usable throughout.",
    },
  ],
  techGroups: [
    {
      name: "Language",
      items: ["Swift 5.10", "Swift Concurrency", "Actors", "Swift Package Manager", "Combine", "Objective-C"],
    },
    {
      name: "UI Frameworks",
      items: ["SwiftUI", "UIKit", "AppKit", "WidgetKit", "watchOS", "visionOS"],
    },
    {
      name: "Data & Services",
      items: ["SwiftData", "Core Data", "CloudKit", "Vapor", "GRDB", "Core ML"],
    },
    {
      name: "Quality & Tooling",
      items: ["XCTest", "Swift Testing", "SwiftLint", "Instruments", "Fastlane", "Xcode Cloud"],
    },
  ],
  faqs: [
    {
      q: "How much can we share between iOS and macOS?",
      a: "Model layers, networking, business logic, and persistence share essentially completely through Swift Packages. SwiftUI shares a large amount of interface code too, but the honest answer is that the last stretch does not share and should not: a Mac application has menus, multiple windows, keyboard navigation, and a pointer, and an iOS layout transplanted unchanged onto macOS is immediately recognisable as a port. We aim for shared logic with platform-appropriate interfaces rather than one interface everywhere.",
    },
    {
      q: "Should we adopt Swift 6 strict concurrency?",
      a: "Yes, though incrementally. Strict concurrency checking turns data races into compile errors, which is a real safety gain — but enabling it on an established codebase surfaces a large number of warnings, most of which are genuine latent bugs rather than false positives. The workable approach is module by module, with the language mode raised per target as each is cleaned up, rather than flipping it on globally and facing several hundred errors at once.",
    },
    {
      q: "Is server-side Swift a sensible choice?",
      a: "In a specific case: when your team is already strong in Swift, when sharing model types between client and server has real value, and when the service is not doing anything exotic. Vapor is mature and performs well. The honest caveats are a smaller ecosystem than Node, Python, or Java, fewer engineers to hire, and less community material when something goes wrong. For a team without existing Swift depth we would usually recommend something more conventional on the server.",
    },
    {
      q: "Can your Swift developers work on our Objective-C codebase?",
      a: "Yes. Most substantial iOS codebases of any age are mixed, and our engineers are comfortable reading and writing Objective-C as well as bridging between the two. Migration is incremental — new code in Swift, existing classes converted when they are next being changed substantially — with attention to nullability annotations on the Objective-C side, since those determine whether the Swift half sees clean optionals or implicitly unwrapped ones.",
    },
  ],
};

const kotlin: HireSkill = {
  slug: "hire-kotlin-developer",
  key: "kotlin",
  name: "Kotlin",
  role: "Kotlin Developers",
  metaTitle: "Hire Kotlin Developers",
  metaDescription:
    "Hire Kotlin developers from Soft Suave for Android, Kotlin Multiplatform, and Ktor back-end services. Coroutines and cross-platform logic. You interview, two-week trial.",
  serviceType: "Kotlin development staffing",
  eyebrow: "Hire Kotlin Developers",
  ctaLabel: "Hire Kotlin developers",
  titleLines: ["Hire Kotlin Developers", "For Android, Server and Shared Code"],
  heroBody: [
    "Kotlin started as a better language for Android and became something broader: a concise, null-safe JVM language that also compiles for iOS, the web, and native targets, with coroutines that make concurrent code readable.",
    "Hiring for Kotlin rather than for Android makes sense when you want shared business logic across platforms, or Kotlin on the server alongside your Android team, rather than a single app on a single platform.",
  ],
  heroPoints: [
    "Kotlin with coroutines, Flow and null safety",
    "Kotlin Multiplatform for shared Android and iOS logic",
    "Ktor and Spring Boot back-end services in Kotlin",
    "Compose Multiplatform for shared interfaces",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-2.webp",
    width: 800,
    height: 1000,
    alt: "A Kotlin codebase shared across Android, iOS, and server-side targets",
  },
  requirementLabel: "What are you building in Kotlin?",
  requirementPlaceholder:
    "Whether this is Android, Multiplatform, or server-side Kotlin — what you want shared, and the seniority you need.",
  overviewTitle: "What Kotlin Developers Actually Do for You",
  overviewParagraphs: [
    "Kotlin's immediate advantages over Java are null safety enforced by the type system, far less ceremony for the same behaviour, and coroutines — a concurrency model that reads sequentially while running asynchronously. On Android those have made it the default; on the server they make it a genuinely attractive alternative to Java with full interoperability, so it can be adopted file by file in an existing JVM codebase.",
    "The more interesting case is Kotlin Multiplatform. Business logic, networking, validation, and persistence are written once and compiled for Android, iOS, desktop, and the server, while each platform keeps its own native interface. That is a materially different proposition from a cross-platform framework: the shared part is the logic, not the UI.",
    "Compose Multiplatform extends that to the interface where you want it, and it is now production-ready on Android, desktop, and iOS. Whether to share UI as well as logic is a real decision with real trade-offs, and it deserves a specific answer rather than a default one.",
  ],
  pullQuote:
    "Kotlin Multiplatform shares the logic and leaves the interface native. That is a different bet from React Native, and it fails differently too.",
  capabilities: [
    {
      name: "Android Development",
      tag: "Mobile",
      body: "Modern Android applications in Kotlin with Jetpack Compose, coroutines, and Flow, using the language features — sealed classes, data classes, extension functions — that make state modelling considerably cleaner.",
    },
    {
      name: "Kotlin Multiplatform",
      tag: "Cross-platform",
      body: "Shared business logic, networking, and persistence across Android and iOS with native interfaces on each, so platform behaviour stays native while the rules exist in exactly one place.",
    },
    {
      name: "Server-Side Kotlin",
      tag: "Back end",
      body: "Ktor services and Spring Boot applications written in Kotlin, with coroutine-based concurrency and full interoperability with existing Java code and libraries in the same codebase.",
    },
    {
      name: "Java to Kotlin Migration",
      tag: "Migration",
      body: "Incremental conversion of Java codebases, file by file, with the platform-type and nullability questions handled deliberately rather than left to the automated converter's defaults.",
    },
    {
      name: "Coroutines and Flow",
      tag: "Concurrency",
      body: "Structured concurrency with proper scope and cancellation, and reactive streams with Flow — replacing callback chains and RxJava with code that is both shorter and easier to reason about.",
    },
    {
      name: "Compose Multiplatform",
      tag: "UI",
      body: "Shared declarative interfaces across Android, desktop, and iOS where that trade genuinely fits, with a frank assessment of where platform-native UI is still the better answer.",
    },
  ],
  techGroups: [
    {
      name: "Language",
      items: ["Kotlin 2.0", "Coroutines", "Flow", "Serialization", "Gradle KTS", "Java interop"],
    },
    {
      name: "Multiplatform",
      items: ["Kotlin Multiplatform", "Compose Multiplatform", "Ktor Client", "SQLDelight", "Koin", "Native interop"],
    },
    {
      name: "Android & Server",
      items: ["Jetpack Compose", "Room", "Hilt", "Ktor Server", "Spring Boot", "Exposed"],
    },
    {
      name: "Quality & Delivery",
      items: ["JUnit 5", "Kotest", "MockK", "Detekt", "Gradle", "GitHub Actions"],
    },
  ],
  faqs: [
    {
      q: "Is Kotlin Multiplatform production-ready?",
      a: "Yes for shared logic — it reached stable status and is used in production by a number of large consumer apps. Sharing networking, business rules, validation, and persistence across Android and iOS while keeping native interfaces is a well-trodden path now. Compose Multiplatform for shared UI is stable on Android and desktop and stable on iOS as of 2025, though the iOS side has a shorter production track record, so we would scope that part deliberately rather than assuming it.",
    },
    {
      q: "How does Kotlin Multiplatform compare to Flutter or React Native?",
      a: "It is a different bet. Flutter and React Native share the interface and render it themselves, so you get one UI everywhere and accept that it is not truly native. KMP shares only the logic and leaves each platform's interface entirely native, so the apps feel exactly right and you write two interfaces. KMP suits teams who already have native iOS and Android developers and want to stop duplicating business rules; Flutter suits teams who want one team building one app.",
    },
    {
      q: "Should we use Kotlin on the server?",
      a: "It is a strong option if your team already writes Kotlin for Android, since the language, tooling, and idioms carry over and coroutines suit service code well. Ktor is lightweight and coroutine-native; Spring Boot works with Kotlin very comfortably and brings the entire Spring ecosystem. The honest caveat is a smaller hiring pool than Java and less community material for unusual problems — real considerations, though rarely decisive for a team already invested in Kotlin.",
    },
    {
      q: "Can you migrate our Java codebase to Kotlin?",
      a: "Yes, incrementally, since the two interoperate completely and can coexist in one module indefinitely. The usual approach is new code in Kotlin and conversion of existing classes when they are next changed substantially, rather than a big-bang conversion with no functional benefit. The part needing real attention is nullability: the automated converter marks Java types as platform types, and accepting those defaults gives you Kotlin syntax without Kotlin's main safety advantage.",
    },
  ],
};

const flutter: HireSkill = {
  slug: "hire-flutter-developers",
  key: "flutter",
  name: "Flutter",
  role: "Flutter Developers",
  metaTitle: "Hire Flutter Developers",
  metaDescription:
    "Hire Flutter developers from Soft Suave to ship one Dart codebase to iOS and Android. Custom UI, platform-channel work, release discipline. You interview, two-week trial.",
  serviceType: "Flutter development staffing",
  eyebrow: "Hire Flutter Developers",
  ctaLabel: "Hire Flutter developers",
  titleLines: ["Hire Flutter Developers", "For One Codebase That Ships to Both Stores"],
  heroBody: [
    "Flutter renders its own interface rather than wrapping native components, which is why a Flutter app looks identical on both platforms and why custom, brand-heavy design is genuinely easier here than anywhere else.",
    "It still ships through both stores, still needs platform channels for anything the plugin ecosystem does not cover, and still needs someone who understands native release. Our Flutter engineers are not only Dart developers.",
  ],
  heroPoints: [
    "Flutter 3 and Dart, iOS and Android from one codebase",
    "Custom design systems and brand-led interfaces",
    "Platform channels into native Swift and Kotlin",
    "Both store release pipelines, not just the build",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-4.webp",
    width: 800,
    height: 1000,
    alt: "A Flutter application rendering an identical custom interface on iOS and Android",
  },
  requirementLabel: "What are you building in Flutter?",
  requirementPlaceholder:
    "The app, the platforms you need, any native capabilities involved, and whether this is a new build or existing code.",
  overviewTitle: "What Flutter Developers Actually Do for You",
  overviewParagraphs: [
    "Flutter draws every pixel itself through its own rendering engine instead of delegating to platform widgets. The consequence is that an app looks and behaves identically on iOS and Android, that custom design is not fighting two different native widget sets, and that animation and visual polish are unusually accessible.",
    "A Flutter engagement covers widget architecture and a design system, state management chosen deliberately from several mature options, navigation, local persistence, networking, platform channels where native capability is needed, and the release pipeline for both stores.",
    "The trade-off is real and worth stating: because Flutter does not use native components, matching precise platform conventions takes deliberate effort, some new OS features arrive later than in native development, and app binaries are larger. For most products that is an acceptable price for halving the codebase; for a product whose value is deep platform integration it is not.",
  ],
  pullQuote:
    "Flutter is one codebase, not one skill set. Someone still has to sign the iOS build and answer to App Review.",
  capabilities: [
    {
      name: "Cross-Platform Apps",
      tag: "Build",
      body: "A single Dart codebase delivering to iOS and Android — and to web and desktop where it fits — with one team, one backlog, and features that land on both platforms simultaneously.",
    },
    {
      name: "Custom Design Systems",
      tag: "UI",
      body: "Brand-led interfaces with bespoke components, transitions, and animation, which is where Flutter's own rendering engine is a genuine advantage rather than a compromise.",
    },
    {
      name: "Platform Channels",
      tag: "Native",
      body: "Swift and Kotlin bridges for hardware access, SDKs with no Flutter plugin, and background behaviour — plus maintaining those bridges, which is where thin Flutter teams typically get stuck.",
    },
    {
      name: "State Management",
      tag: "Architecture",
      body: "Riverpod, Bloc, or Provider chosen for the product's actual complexity rather than by preference, with a structure that survives the app growing past its first dozen screens.",
    },
    {
      name: "Performance Tuning",
      tag: "Performance",
      body: "Diagnosing jank with the Flutter DevTools timeline, controlling rebuild scope, using const constructors and list virtualisation properly, and reducing app size through deferred loading.",
    },
    {
      name: "Store Release",
      tag: "Release",
      body: "Signing, provisioning, App Review and Play policy compliance, staged rollout, and crash monitoring on both platforms — the native half of shipping a Flutter app.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["Flutter 3", "Dart 3", "Material 3", "Cupertino", "go_router", "Impeller"],
    },
    {
      name: "State & Data",
      items: ["Riverpod", "Bloc", "Provider", "Drift", "Isar", "Dio"],
    },
    {
      name: "Platform & Services",
      items: ["Firebase", "Platform Channels", "FCM Push", "In-App Purchase", "Maps", "Camera"],
    },
    {
      name: "Quality & Release",
      items: ["flutter_test", "Integration Test", "Patrol", "Fastlane", "Codemagic", "Crashlytics"],
    },
  ],
  faqs: [
    {
      q: "Is Flutter a good choice for our app?",
      a: "It is strong when you want the same app on both platforms with one team, when the interface is custom and brand-led rather than strictly platform-conventional, and when time to market matters. It is a weaker choice when the product's value is deep platform integration — complex widgets, extensive background processing, tight OS feature adoption — or when you need each platform to feel exactly like its own. We will tell you if we think your requirements point to native.",
    },
    {
      q: "Do Flutter apps feel native?",
      a: "They feel consistent, which is not the same thing. Flutter draws its own widgets, so an app looks identical on both platforms — excellent if your brand is the point, less so if users expect exact platform conventions. Flutter provides both Material and Cupertino component sets and a well-built app is indistinguishable to most users, but a discerning iOS user can often tell. Whether that matters depends entirely on your audience.",
    },
    {
      q: "Can Flutter access native device features?",
      a: "Yes. Most common capabilities — camera, location, biometrics, notifications, payments — have mature plugins. Anything beyond that is reached through platform channels, which means writing Swift and Kotlin on the other side of the bridge. That is normal and expected, and it is exactly where teams hiring only Dart developers come unstuck. Our Flutter engineers write both sides, and we say so on the shortlist.",
    },
    {
      q: "How does Flutter compare to React Native?",
      a: "Flutter renders its own widgets, giving pixel-identical output and smoother custom animation, with Dart as the language. React Native maps to actual native components and uses JavaScript, so it inherits platform look automatically and lets a React team reuse existing skills. Choose Flutter for design-led products and teams without React investment; choose React Native when you already have React engineers and web-mobile code sharing matters. Both are mature — this is a team and product question, not a technical winner.",
    },
  ],
};

const reactNative: HireSkill = {
  slug: "hire-react-native-developers",
  key: "react-native",
  name: "React Native",
  role: "React Native Developers",
  metaTitle: "Hire React Native Developers",
  metaDescription:
    "Hire React Native developers from Soft Suave to reuse React skills across iOS and Android. Expo, the New Architecture, and native modules. You interview, two-week trial.",
  serviceType: "React Native development staffing",
  eyebrow: "Hire React Native Developers",
  ctaLabel: "Hire React Native developers",
  titleLines: ["Hire React Native Developers", "Who Are Comfortable Below the Bridge"],
  heroBody: [
    "React Native lets a team that already knows React ship to both app stores, sharing patterns, libraries, and often real code with an existing web product. For a company with React engineers, that is the cheapest route to a credible mobile app.",
    "The distinction that matters when hiring is whether a candidate can work below the JavaScript layer. Native modules, build configuration, and upgrades are where React Native projects actually stall.",
  ],
  heroPoints: [
    "React Native with the New Architecture and Fabric",
    "Expo and bare workflows, including the migration",
    "Native modules in Swift and Kotlin when required",
    "EAS, OTA updates and both store pipelines",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-5.webp",
    width: 800,
    height: 1000,
    alt: "A React Native application sharing components and logic across iOS and Android",
  },
  requirementLabel: "What are you building in React Native?",
  requirementPlaceholder:
    "The app, whether you use Expo, any native capabilities involved, existing web code to share, and the seniority you need.",
  overviewTitle: "What React Native Developers Actually Do for You",
  overviewParagraphs: [
    "React Native runs JavaScript and maps your components onto genuine native views, so the interface uses real platform components rather than a re-implementation. For organisations with React expertise this is the decisive advantage: the mental model, much of the tooling, and often the state and business logic carry straight across from web.",
    "A React Native engagement covers component and navigation architecture, state management, native module integration, performance work on lists and animation, and the release pipeline — which is genuinely two pipelines, because App Review and Play policy both apply exactly as they would to a native app.",
    "Two things separate experienced React Native engineers from React engineers who have written some React Native. The first is comfort below the JavaScript layer: reading native build errors, writing a Swift or Kotlin module, and resolving a CocoaPods or Gradle conflict. The second is upgrades, which have historically been the framework's hardest recurring cost — much improved by the New Architecture and Expo's tooling, but still not trivial.",
  ],
  pullQuote:
    "A React Native project rarely stalls in JavaScript. It stalls on a Gradle conflict nobody on the team can read.",
  capabilities: [
    {
      name: "Cross-Platform Apps",
      tag: "Build",
      body: "iOS and Android from one TypeScript codebase using real native components, with the architecture and navigation structure to support an app that grows well past its first release.",
    },
    {
      name: "Expo and EAS",
      tag: "Tooling",
      body: "Managed and bare workflows, EAS Build and Submit, over-the-air updates for JavaScript-only changes, and honest guidance on when a project should leave the managed workflow.",
    },
    {
      name: "Native Modules",
      tag: "Native",
      body: "Swift and Kotlin modules for hardware access, third-party SDKs without a maintained wrapper, and background behaviour — the work that determines whether a requirement is possible at all.",
    },
    {
      name: "New Architecture Migration",
      tag: "Migration",
      body: "Moving apps onto Fabric and TurboModules, including the dependency audit that decides whether your libraries are ready, and the interim bridge-mode path where they are not.",
    },
    {
      name: "Performance Engineering",
      tag: "Performance",
      body: "List virtualisation with FlashList, Reanimated for animation that runs off the JavaScript thread, render profiling, and startup-time reduction — the recurring React Native complaints and their actual fixes.",
    },
    {
      name: "Web and Mobile Sharing",
      tag: "Reuse",
      body: "Sharing types, API clients, validation, and business logic with an existing React web application in a monorepo, while keeping the interface layers separate as they should be.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["React Native 0.7x", "TypeScript", "Expo", "New Architecture", "React Navigation", "Reanimated"],
    },
    {
      name: "State & Data",
      items: ["TanStack Query", "Redux Toolkit", "Zustand", "MMKV", "WatermelonDB", "AsyncStorage"],
    },
    {
      name: "Native & Services",
      items: ["Swift / Kotlin modules", "Firebase", "Push Notifications", "In-App Purchases", "Maps", "Camera"],
    },
    {
      name: "Quality & Release",
      items: ["Jest", "Detox", "Maestro", "EAS Build", "Fastlane", "Sentry"],
    },
  ],
  faqs: [
    {
      q: "Should we use Expo or bare React Native?",
      a: "Expo for most projects now. The managed workflow removes a very large amount of native build configuration, EAS handles building and submission, and config plugins cover most native customisation that previously required ejecting. Bare workflow is still the answer when you need deep native customisation, have SDKs that will not work through a config plugin, or must control the native projects directly. Starting in Expo and moving out later is a supported path, and far less painful than it used to be.",
    },
    {
      q: "Can we share code with our React web app?",
      a: "Yes, and this is often the strongest argument for React Native. Types, API clients, validation schemas, and business logic share cleanly in a monorepo. Components mostly do not, and trying to force it usually produces abstractions that serve neither platform well — web uses div and CSS, React Native uses View and its own style system. Plan on sharing the layer beneath the interface, which is typically a substantial share of a product's actual complexity.",
    },
    {
      q: "Is React Native performance good enough?",
      a: "For the overwhelming majority of apps, yes — including large consumer products from major companies. The New Architecture removed the asynchronous bridge that caused the worst historical problems. Where care is still needed: long lists need FlashList or proper virtualisation, animation should run through Reanimated on the UI thread, and heavy computation belongs in a native module. A poorly-built React Native app is noticeably slow, which is true of a poorly-built native app too.",
    },
    {
      q: "How difficult are React Native upgrades?",
      a: "Historically this was the framework's worst recurring cost, and it has improved substantially. Expo-managed projects upgrade close to painlessly, since Expo pins a compatible dependency set per SDK version. Bare projects are harder — the React Native Upgrade Helper diffs the native project templates for you, but third-party libraries with native code are where the real work lands. We recommend upgrading regularly rather than in one large jump, because the cost compounds sharply with each version skipped.",
    },
  ],
};

const ionic: HireSkill = {
  slug: "hire-ionic-developers",
  key: "ionic",
  name: "Ionic",
  role: "Ionic Developers",
  metaTitle: "Hire Ionic Developers",
  metaDescription:
    "Hire Ionic developers from Soft Suave to ship web, iOS, and Android from one codebase using Angular, React, or Vue with Capacitor. You interview, two-week trial.",
  serviceType: "Ionic development staffing",
  eyebrow: "Hire Ionic Developers",
  ctaLabel: "Hire Ionic developers",
  titleLines: ["Hire Ionic Developers", "For Web and Mobile From One Codebase"],
  heroBody: [
    "Ionic builds mobile apps from web technology: your existing Angular, React, or Vue skills, a component library that adapts to each platform's conventions, and Capacitor to reach native capability and the app stores.",
    "It is the pragmatic choice when the same product must work as a website and as an app, and when your team are web developers. Our Ionic engineers also handle the Capacitor and native-release half.",
  ],
  heroPoints: [
    "Ionic 8 with Angular, React or Vue",
    "Capacitor plugins and native project configuration",
    "One codebase serving web, iOS and Android",
    "Progressive Web Apps and offline behaviour",
    "You interview every candidate — two-week trial",
  ],
  image: {
    src: "/images/four/work-6.webp",
    width: 800,
    height: 1000,
    alt: "An Ionic application running as a website and as installed mobile apps",
  },
  requirementLabel: "What are you building in Ionic?",
  requirementPlaceholder:
    "The app, your framework choice, whether web and mobile share one codebase, native features needed, and the seniority you need.",
  overviewTitle: "What Ionic Developers Actually Do for You",
  overviewParagraphs: [
    "Ionic is a component library and toolchain that runs a web application inside a native container. The interface is HTML and CSS rendered in a web view, styled by components that adapt to iOS and Android conventions, and Capacitor provides the bridge to native APIs and the native projects that get submitted to the stores.",
    "The strongest case for it is genuine web-and-mobile parity: one codebase serving a responsive website, an installable PWA, and two store apps, built by developers who already write Angular, React, or Vue. For content-driven apps, business tooling, and forms-heavy products that is an efficient arrangement and the web-view rendering is not a practical limitation.",
    "Where it is the wrong choice is equally clear, and worth saying plainly: graphics-intensive interfaces, sustained heavy computation, and apps whose value depends on deep platform integration or very high-fidelity native feel. A web view has a ceiling, and pretending otherwise leads to a rebuild eighteen months in.",
  ],
  pullQuote:
    "Ionic is excellent for forms, content, and business tooling. It is the wrong tool for anything that has to feel like a game.",
  capabilities: [
    {
      name: "Web and Mobile Parity",
      tag: "Build",
      body: "One codebase producing a responsive website, an installable PWA, and iOS and Android store apps, so a feature is specified, built, and tested once rather than three times.",
    },
    {
      name: "Framework Flexibility",
      tag: "Choice",
      body: "Ionic with Angular, React, or Vue depending on what your team already writes — the framework choice stays yours, and the component library and Capacitor layer are the same either way.",
    },
    {
      name: "Capacitor Integration",
      tag: "Native",
      body: "Camera, geolocation, biometrics, push notifications, filesystem, and secure storage through Capacitor plugins, plus custom plugins in Swift and Kotlin where no maintained one exists.",
    },
    {
      name: "Progressive Web Apps",
      tag: "Web",
      body: "Service workers, offline caching, installability, and background sync, for reaching users who will not install an app and for markets where store distribution is not the primary channel.",
    },
    {
      name: "Cordova Migration",
      tag: "Migration",
      body: "Moving older Cordova and Ionic 3 or 4 applications onto Capacitor and current Ionic, replacing unmaintained plugins and modernising the build — common, and increasingly urgent as plugins go stale.",
    },
    {
      name: "Store Release",
      tag: "Release",
      body: "Native project configuration, signing, App Review and Play policy compliance, and live updates for web-layer changes — the half of the work that is not web development at all.",
    },
  ],
  techGroups: [
    {
      name: "Core",
      items: ["Ionic 8", "Capacitor 6", "Angular", "React", "Vue", "Stencil"],
    },
    {
      name: "Data & State",
      items: ["SQLite", "Ionic Storage", "RxJS", "NgRx", "TanStack Query", "Preferences API"],
    },
    {
      name: "Native Plugins",
      items: ["Camera", "Geolocation", "Push Notifications", "Biometrics", "Filesystem", "Custom plugins"],
    },
    {
      name: "Quality & Release",
      items: ["Jest", "Cypress", "Playwright", "Fastlane", "Appflow", "Sentry"],
    },
  ],
  faqs: [
    {
      q: "Is Ionic right for our app?",
      a: "It fits well when the same product must exist as a website and as apps, when your team already writes web code, and when the app is content, forms, or workflow driven — business tooling, field-service apps, portals, and catalogues all work well. It is the wrong choice for graphics-intensive interfaces, sustained heavy computation, or products whose value is deep platform integration. We would rather tell you that at the shortlist stage than eighteen months into a build.",
    },
    {
      q: "Capacitor or Cordova?",
      a: "Capacitor for everything current. It is Ionic's own successor to Cordova, treats the native iOS and Android projects as source you own and can edit directly, has a better plugin model, and is actively developed. Cordova is effectively legacy and many of its plugins are unmaintained, which is a security and compatibility problem rather than only a tidiness one. Migrating an existing Cordova app to Capacitor is well-trodden work and usually worth doing.",
    },
    {
      q: "How does Ionic performance compare to native?",
      a: "For typical business and content applications it is perfectly acceptable — modern web views are fast, and users do not notice the difference on forms, lists, and navigation. The gap shows in sustained animation, very long complex lists, and anything graphics-heavy, and there is a startup cost as the web view initialises. Virtual scrolling, lazy-loaded routes, and keeping the initial bundle small address most of what people notice in practice.",
    },
    {
      q: "Can we use our existing Angular team?",
      a: "Yes, and that is a large part of Ionic's appeal. Ionic Angular uses the same components, services, routing, and RxJS patterns your team already writes, so the learning curve is the Ionic component library and Capacitor rather than a new framework. What still needs covering is the native half — signing, store submission, review policy, and the occasional native build error — which is what our engineers bring alongside the Angular work.",
    },
  ],
};

export const mobileHireSkills: readonly HireSkill[] = [
  android,
  ios,
  swift,
  kotlin,
  flutter,
  reactNative,
  ionic,
];
