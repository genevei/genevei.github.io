20:42 2026/10/28
# Stomp: bulk glider synthesis, made easy
The numbers of unsynthesised 23-bit still lifes and *all* unsynthesised natural still lifes have been brought down to staggeringly low numbers using a tool that has been available for a long time, but have you ever wondered how you could pull such feats off yourself? Well, you're in luck!
## Requisites
* Cygwin / WSL (steps have been tested for Cygwin)
* git and Clang++

## Installing
Firstly, install Shinjuku. This is where Stomp will source components.
```bash
$ git clone https://gitlab.com/parclytaxel/Shinjuku.git
```
*Then* you can install the LifeAPI repository, where Stomp is located:
```bash
$ git clone --recurse-submodules https://github.com/mvr/LifeAPI.git
```
``cd`` to wherever you have cloned LifeAPI and open up your favorite text editor, because normal output from the compilation command generates two errors!
 Replace all instances of the string
``constexpr LifeState corona`` in ``LifeAPI.hpp`` with ``static const LifeState corona`` (I have no idea what this actually does but it works I guess).

Once that's done, you are finally able to compile the thing.
```bash
$ clang++ -std=c++20 -Wall -Wextra -pedantic -O3 -DNDEBUG -march=native -mtune=native -fno-stack-protector -fomit-frame-pointer -fno-pic -o Stomp tools/Stomp.cpp
```
(This line was modified from the one in the Makefile included in the repository. In practice, this is the only file that needs to be compiled.)

If all goes well, you are free to begin using Stomp!

## Usage
The many different options will be covered shortly. For now, let us synthesise a random still life sourced from... somewhere: xs24_25is0ggz254210254ko.

Let's break down a line that searches for a synthesis of this object:
```bash
./Stomp Shinjuku/shinjuku/comp --target xs24_25is0ggz254210254ko --accept-first --skip-existing --max-depth 4
```
``
./Stomp Shinjuku/shinjuku/comp
`` - Running Stomp requires you to supply it with the Shinjuku component directory, as ``components_path``. In our case it's ``Shinjuku/shinjuku/comp``. This is the first argument you write when calling.

``
--target xs24_25is0ggz254210254ko
`` - Telling Stomp what still life(s) to synthesise is easy: use the ``target`` argument foreone object, and ``target-file`` (and the name of the file) for multiple.

``
--accept-first
`` - By default Stomp attempts to find multiple syntheses for a given object. Adding this argument prevents Stomp from attempting to search further when a solution exists.

``
--skip-existing
`` - Any object already synthesisable, according to the components Shinjuku currently has in ``components_path``, is skipped.

``
--max-depth
`` - The largest depth at which Stomp will search for syntheses. ``--max-depth 4`` means Stomp will search for syntheses that solve the object with four or less components (partial glider syntheses that can be used on multiple still lifes, that bring one still life to another).

 Running Stomp for the first time will cause it to generate template files for each file in the Shinjuku directory. The output is quite verbose at first glance because of this, but it only needs to be done once (assuming the files in ``components_path`` stay the same). Let it churn away for a few good minutes before returning to the results:
``` text
Combining and deduplicating 156962 templates across all files
Combined 38917 unique templates, filtered to 38917 (occurring ≥1 times)
[1/1] Searching for xs24_25is0ggz254210254ko (new synthesis)
  Starting search with 1 threads
  Processing depth 0, pop 24, queue size 0: xs24_25is0ggz254210254ko
   Found in database: xs20_25icz694315a4 (cost 11)
  Accept-first: stopping search early
20$45bobo$45b2o$46bo3$45bo$46bo$44b3o$52bo$50b2o$51b2o2$38bo$37bobo10bo$36bobo10b2o$36bo12bobo$37bo$34b3obo$33bo2bo2bo$32bobo2bobo$33bo4bo!
  ✓ New synthesis: cost 15
Synthesis complete: 1/1 targets synthesised
```

And *that's* how you synthesise still lifes with Stomp!

Other options that can be useful include:

``--max-precursor-pop`` - the largest population of any still life used by *any* component to reach the target. This is practically necessary for larger still lifes.

``--most-expensive`` - by default, searches for cheaper alternative syntheses for the 1000 most costly still lifes in each population class (all still lifes with a given population) in the file provided with ``--target``.

Piping Stomp to a file will write the RLE data to said file, but *not* the other lines output by the program. This makes it practical for synthesising still lifes in large numbers.
