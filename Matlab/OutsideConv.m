function [outputArg1] = OutsideConv(input1,time)
%UNTITLED Summary of this function goes here
%   Detailed explanation goes here
global indexOutside;

if (input1.time(indexOutside)<= time)
    indexOutside= indexOutside+1
end
input1.time(indexOutside)
time
outputArg1 = input1.data(indexOutside);

end

