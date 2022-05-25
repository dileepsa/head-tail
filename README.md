# HEAD

```Head displays the first count lines or bytes of each of the specified files, If count is omitted ,it defaults to 10.```

**SYNTAX**

`head -n count | -c bytes file...`

**DESCRIPTION**

```
head file 
  This filter displays the first count lines or bytes of each of the specified files, If count is omitted ,it defaults to 10.

head -n count
  Display the lines upto the count.

head -c bytes
  Display the characters specified in bytes.

head file1 file2
  Display the lines in file1 and file2.

```

# TAIL

```Tail displays the last count lines or bytes of each of the specified files, If count is omitted ,it defaults to 10```

**SYNTAX**

```tail [-r] [-q] [-c number | -n number] [file ...]```

**DESCRIPTION**

```
tail file
  display the last part of a file.

  tail -n count [...files]
  display last `count` lines in a file.
  
  tail -c count [...files]
  display last `count` bytes in a file.

  tail file1 file2
  Display the last lines in specified files.
  
```