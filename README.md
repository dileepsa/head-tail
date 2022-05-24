`head -n count | -c bytes file...`

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