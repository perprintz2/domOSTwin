function [outputArg1,io] = findValue(input1,time,i)
%UNTITLED Summary of this function goes here
%   Detailed explanation goes here
i;

if (time==1)
    i=1;
end


while ((input1.time(i) < time) && (i < length(input1.data)))
    i=i+1;
end

outputArg1 = input1.data(i);
io=i;
end